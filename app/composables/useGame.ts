import type { UseGameReturn } from '~/types/game.types';
import { getGameConfig } from '~/config/game.config';
import { useBoardState, setCellValue, resetBoard } from './useBoardState';
import { usePlayerManager } from './usePlayerManager';
import { useGameState, checkGameStatus } from './useGameState';
import { useLoadingState } from './useLoadingState';
import { isCellEmpty } from '~/utils/board.utils';

/**
 * Main game orchestrator composable
 * Coordinates all sub-composables and provides unified game API
 */
export const useGame = (): UseGameReturn => {
    const config = getGameConfig();

    // Initialize sub-composables
    const boardState = useBoardState(config.rows, config.cols);
    const playerManager = usePlayerManager(config.defaultPlayer);
    const gameState = useGameState(config.rows, config.cols);
    const loadingState = useLoadingState();

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
