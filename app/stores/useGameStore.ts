import { defineStore } from 'pinia';
import { getGameConfig } from '~/config/game.config';
import type { GameConfig, CellValue, Player } from '~/types/game.types';
import { initBoardMatrix } from '~/utils/shared';
import { EMPTY_CELL } from '~/constants/game.constants';
import { isCellEmpty, isBoardFull } from '~/utils/board.utils';
import { getNextPlayer } from '~/utils/player.utils';
import { checkWin, type WinResponse } from '~/utils/checkWin';

/**
 * Pinia store for game state management
 * Flat state structure for proper reactivity and persistence
 */
export const useGameStore = defineStore('game-store', () => {
    // GAME STATE

    // Configuration
    const config = ref<GameConfig>(getGameConfig());
    const isFreshBoard = ref(true);

    // Board state
    const board = ref<CellValue[][]>(
        initBoardMatrix(config.value.rows, config.value.cols, EMPTY_CELL),
    );
    const currentPlayer = ref<CellValue>(config.value.defaultPlayer);

    // Game state
    const winner = ref<CellValue | null>(null);
    const resultData = ref<WinResponse>({
        resultMatrix: initBoardMatrix(config.value.rows, config.value.cols, false),
        type: null,
        index: 0,
    });
    const isDraw = ref<boolean>(false);
    const isResultOpen = ref<boolean>(false);

    // Loading states
    const isLoading = ref<boolean>(false);
    const isBoardLoading = ref<boolean>(true);

    // Computed Getters.

    const rows = computed(() => config.value.rows);
    const cols = computed(() => config.value.cols);
    const defaultPlayer = computed(() => config.value.defaultPlayer);

    const isGameOver = computed(() => winner.value !== null || isDraw.value);

    // Score Store.
    const gameScore = useGameScoreStore();

    // Actions.

    /**
     * Update game configuration and reset game
     */
    function updateGameConfig(appConfig: Partial<GameConfig>): void {
        config.value = { ...config.value, ...appConfig };
        resetGame();
        isFreshBoard.value = true;
    }

    /**
     * Make a move on the board
     */
    function makeMove(rowIndex: number, colIndex: number): void {
        // Prevent moves if game is over
        if (isGameOver.value) {
            return;
        }

        isFreshBoard.value = false;
        isLoading.value = true;

        try {
            // Check if cell is empty
            if (!isCellEmpty(board.value, rowIndex, colIndex)) {
                isLoading.value = false;
                return;
            }

            // Set cell value directly
            if (board.value[rowIndex]) {
                board.value[rowIndex]![colIndex] = currentPlayer.value;
            }

            // Check game status (win or draw)
            const winResult = checkWin(
                rows.value,
                cols.value,
                board.value,
                currentPlayer.value,
            );

            if (winResult && winResult.resultMatrix) {
                setWinner(currentPlayer.value, winResult);
            }
            else if (isBoardFull(board.value)) {
                setDraw();
            }
            else {
                // Switch player only if game is not over
                switchPlayer();
            }
        }
        finally {
            isLoading.value = false;
        }
    }

    /**
     * Switch to the next player
     */
    function switchPlayer(): void {
        if (currentPlayer.value) {
            currentPlayer.value = getNextPlayer(currentPlayer.value);
        }
    }

    /**
     * Set winner and update score
     */
    function setWinner(player: CellValue, winResult: WinResponse): void {
        isResultOpen.value = true;
        winner.value = player;
        resultData.value = {
            resultMatrix: winResult.resultMatrix,
            type: winResult.type,
            index: winResult.index,
        };

        // Update score
        gameScore.updateScore(player?.toUpperCase() as Player);
    }

    function setDraw(): void {
        isResultOpen.value = true;
        isDraw.value = true;
    }

    function resetGame(): void {
        // Reset board
        board.value = initBoardMatrix(rows.value, cols.value, EMPTY_CELL);

        // Reset player
        currentPlayer.value = defaultPlayer.value;

        // Reset game state
        winner.value = null;
        resultData.value = {
            resultMatrix: initBoardMatrix(rows.value, cols.value, false),
            type: null,
            index: 0,
        };
        isDraw.value = false;
        isResultOpen.value = false;

        // Reset loading
        isLoading.value = false;
        isBoardLoading.value = false;

        isFreshBoard.value = true;
    }

    /**
     * Close result modal
     */
    function closeResult(): void {
        isResultOpen.value = false;
    }

    // Initialize board loading state when store is created
    onMounted(() => {
        isBoardLoading.value = false;
    });

    return {
        // Game State
        config,
        isFreshBoard,
        board,
        currentPlayer,
        winner,
        resultData,
        isDraw,
        isResultOpen,
        isLoading,
        isBoardLoading,

        // Computed Getters.
        rows,
        cols,
        defaultPlayer,
        isGameOver,

        // Actions
        makeMove,
        resetGame,
        updateGameConfig,
        closeResult,
    };
}, {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
    },
});
