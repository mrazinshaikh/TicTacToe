import type { UseGameReturn, GameMode } from '~/types/game.types';
import { getGameConfig } from '~/config/game.config';
import { useBoardState, setCellValue, resetBoard } from './useBoardState';
import { usePlayerManager } from './usePlayerManager';
import { useGameState, checkGameStatus } from './useGameState';
import { useLoadingState } from './useLoadingState';
import { useBotPlayer } from './useBotPlayer';
import { isCellEmpty } from '~/utils/board.utils';

/**
 * Main game orchestrator composable
 * Coordinates all sub-composables and provides unified game API
 * @param gameMode - Optional game mode ('vsPlayer' or 'vsBot'). Can be a ref for reactivity. Defaults to 'vsPlayer'
 */
export const useGame = (gameMode: GameMode | Ref<GameMode> = 'vsPlayer'): UseGameReturn => {
    const config = getGameConfig();

    // Initialize sub-composables
    const boardState = useBoardState(config.rows, config.cols);
    const playerManager = usePlayerManager(config.defaultPlayer);
    const gameState = useGameState(config.rows, config.cols);
    const loadingState = useLoadingState();

    // Convert gameMode to a ref if it's not already
    const gameModeRef = isRef(gameMode) ? gameMode : ref(gameMode);

    // Always initialize bot player (we'll conditionally use it)
    const botPlayer = useBotPlayer({
        botPlayer: config.defaultPlayer, // Bot plays as the starting player
        rows: config.rows,
        cols: config.cols,
        delay: 500, // 500ms delay for better UX
    });

    /**
     * Make a move on the board
     */
    const makeMove = (rowIndex: number, colIndex: number): void => {
        // Prevent moves if game is over
        if (gameState.isGameOver.value) {
            return;
        }

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

                // If vsBot mode and it's bot's turn, make bot move
                if (gameModeRef.value === 'vsBot' && botPlayer.isBotTurn(playerManager.currentPlayer.value)) {
                    // Use nextTick to ensure board state is updated before bot calculates move
                    nextTick(() => {
                        botPlayer.makeBotMove(
                            boardState.data.value,
                            (row, col) => {
                                // Recursively call makeMove for bot's move
                                makeMove(row, col);
                            },
                        );
                    });
                }
            }
        }
        finally {
            loadingState.stopLoading();
        }
    };

    /**
     * Reset the game to initial state
     */
    const resetGame = (): void => {
        resetBoard(boardState);
        playerManager.resetPlayer();
        gameState.reset();
        loadingState.setLoading(false);
        loadingState.setBoardLoading(false);

        // If vsBot mode and bot goes first, trigger bot move after reset
        if (gameModeRef.value === 'vsBot' && botPlayer.isBotTurn(playerManager.currentPlayer.value)) {
            nextTick(() => {
                botPlayer.makeBotMove(
                    boardState.data.value,
                    (row, col) => {
                        makeMove(row, col);
                    },
                );
            });
        }
    };

    return {
        // Board state
        board: boardState.data,
        rows: boardState.rows,
        cols: boardState.cols,

        // Player state
        currentPlayer: playerManager.currentPlayer,

        // Game state
        winner: gameState.winner,
        resultData: gameState.resultData,
        isGameOver: gameState.isGameOver,
        isDraw: gameState.isDraw,

        // Loading state
        isLoading: loadingState.isLoading,
        isBoardLoading: loadingState.isBoardLoading,

        // Actions
        makeMove,
        resetGame,
    };
};
