import { defineStore } from 'pinia';
import { getGameConfig } from '~/config/game.config';
import type { GameConfig } from '~/types/game.types';

export const useGameStore = defineStore('game-store', () => {
    const config = ref(getGameConfig());

    const isFreshBoard = ref(true);
    // Initialize sub-composables
    let boardState = useBoardState(config.value.rows, config.value.cols);
    let playerManager = usePlayerManager(config.value.defaultPlayer);
    let gameState = useGameState(config.value.rows, config.value.cols);
    let loadingState = useLoadingState();

    function updateGameConfig(appConfig: Partial<GameConfig>) {
        config.value = { ...config.value, ...appConfig };

        // Rest game state.
        boardState = useBoardState(config.value.rows, config.value.cols);
        playerManager = usePlayerManager(config.value.defaultPlayer);
        gameState = useGameState(config.value.rows, config.value.cols);
        loadingState = useLoadingState();
        isFreshBoard.value = true;
    };

    onMounted(() => {
        loadingState.isBoardLoading.value = false;
    });
    /**
     * Make a move on the board
     */
    function makeMove(rowIndex: number, colIndex: number): void {
        // Prevent moves if game is over
        if (gameState.isGameOver.value) {
            return;
        }

        isFreshBoard.value = false;

        // Start loading
        loadingState.startLoading();

        try {
            // Check if cell is empty
            if (!isCellEmpty(boardState.data.value, rowIndex, colIndex)) {
                loadingState.stopLoading();
                return;
            }

            // Set cell value
            setCellValue(boardState, rowIndex, colIndex, playerManager.currentPlayer.value);

            // Check game status (win or draw)
            checkGameStatus(
                gameState,
                boardState.data.value,
                playerManager.currentPlayer.value,
                boardState.rows,
                boardState.cols,
            );

            // Switch player only if game is not over
            if (!gameState.isGameOver.value) {
                playerManager.switchPlayer();
            }
        }
        finally {
            loadingState.stopLoading();
        }
    };

    /**
     * Reset the game to initial state
     */
    function resetGame(): void {
        resetBoard(boardState);
        playerManager.resetPlayer();
        gameState.reset();
        loadingState.setLoading(false);
        loadingState.setBoardLoading(false);
        isFreshBoard.value = true;
    };

    return {
        isFreshBoard,
        config,
        // Board state
        board: boardState.data,
        rows: boardState.rows,
        cols: boardState.cols,

        // Player state
        currentPlayer: playerManager.currentPlayer,
        defaultPlayer: config.value.defaultPlayer,

        // Game state
        winner: gameState.winner,
        resultData: gameState.resultData,
        isGameOver: gameState.isGameOver,
        isDraw: gameState.isDraw,
        isResultOpen: gameState.isResultOpen,

        // Loading state
        isLoading: loadingState.isLoading,
        isBoardLoading: loadingState.isBoardLoading,

        // Actions
        makeMove,
        resetGame,
        updateGameConfig,
        closeResult: gameState.closeResult,
    };
}, {
    persist: {
        storage: piniaPluginPersistedstate.cookies({
            maxAge: 60 * 60,
        }),
    },
});
