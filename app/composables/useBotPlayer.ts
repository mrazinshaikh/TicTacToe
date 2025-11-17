import type { CellValue } from '~/types/game.types';
import { findBestMove } from '~/utils/minimax';

/**
 * Bot player configuration
 */
export interface BotPlayerConfig {
    botPlayer: CellValue;
    rows: number;
    cols: number;
    delay?: number; // Delay in milliseconds before bot makes move (for UX)
}

/**
 * Composable for managing bot player moves
 * This is separate from the main game logic to keep concerns separated
 */
export const useBotPlayer = (config: BotPlayerConfig) => {
    const isBotThinking = ref(false);

    /**
     * Calculate and return the best move for the bot
     * @param board - Current game board state
     * @returns Best move coordinates or null if no move available
     */
    const calculateBotMove = (board: CellValue[][]): { row: number; col: number } | null => {
        isBotThinking.value = true;

        try {
            const bestMove = findBestMove(board, config.botPlayer, config.rows, config.cols);
            return bestMove;
        }
        finally {
            isBotThinking.value = false;
        }
    };

    /**
     * Check if it's the bot's turn
     * @param currentPlayer - Current player in the game
     * @returns True if current player is the bot
     */
    const isBotTurn = (currentPlayer: CellValue): boolean => {
        return currentPlayer === config.botPlayer;
    };

    /**
     * Make bot move with optional delay for better UX
     * @param board - Current game board state
     * @param onMove - Callback function to execute the move (row, col) => void
     */
    const makeBotMove = async (
        board: CellValue[][],
        onMove: (row: number, col: number) => void,
    ): Promise<void> => {
        const bestMove = calculateBotMove(board);

        if (!bestMove) {
            return; // No valid move available
        }

        // Add delay for better UX (makes it feel more natural)
        const delay = config.delay ?? 500;
        await new Promise(resolve => setTimeout(resolve, delay));

        // Execute the move
        onMove(bestMove.row, bestMove.col);
    };

    return {
        isBotThinking: readonly(isBotThinking),
        calculateBotMove,
        isBotTurn,
        makeBotMove,
    };
};
