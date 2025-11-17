import type { CellValue } from '~/types/game.types';
import { checkWin } from './checkWin';
import { isBoardFull, getEmptyCells } from './board.utils';
import { getNextPlayer } from './player.utils';

/**
 * Evaluate the board state and return a score
 * Positive score = bot wins, Negative score = human wins, 0 = draw/no winner
 */
function evaluateBoard(
    board: CellValue[][],
    botPlayer: CellValue,
    humanPlayer: CellValue,
    rows: number,
    cols: number,
): number {
    const botWin = checkWin(rows, cols, board, botPlayer);
    const humanWin = checkWin(rows, cols, board, humanPlayer);

    if (botWin && botWin.won) {
        return 10; // Bot wins
    }
    if (humanWin && humanWin.won) {
        return -10; // Human wins
    }
    return 0; // No winner or draw
}

/**
 * Minimax algorithm implementation
 * @param board - Current game board state
 * @param depth - Current depth in the game tree
 * @param isMaximizing - True if it's the bot's turn (maximizing), false if human's turn (minimizing)
 * @param botPlayer - The bot's player symbol (X or O)
 * @param humanPlayer - The human's player symbol (X or O)
 * @param rows - Number of rows in the board
 * @param cols - Number of columns in the board
 * @returns Score for the current board state
 */
function minimax(
    board: CellValue[][],
    depth: number,
    isMaximizing: boolean,
    botPlayer: CellValue,
    humanPlayer: CellValue,
    rows: number,
    cols: number,
): number {
    // Evaluate the current board state
    const score = evaluateBoard(board, botPlayer, humanPlayer, rows, cols);

    // Base cases: if there's a winner or the board is full
    if (score === 10) {
        return score - depth; // Prefer faster wins
    }
    if (score === -10) {
        return score + depth; // Prefer slower losses
    }
    if (isBoardFull(board)) {
        return 0; // Draw
    }

    // Recursive case: try all possible moves
    if (isMaximizing) {
        // Bot's turn - maximize score
        let bestScore = -Infinity;
        const emptyCells = getEmptyCells(board);

        for (const { row, col } of emptyCells) {
            // Make move
            board[row]![col] = botPlayer;

            // Recursively evaluate
            const moveScore = minimax(
                board,
                depth + 1,
                false,
                botPlayer,
                humanPlayer,
                rows,
                cols,
            );

            // Undo move
            board[row]![col] = null;

            // Track best score
            bestScore = Math.max(bestScore, moveScore);
        }

        return bestScore;
    }
    else {
        // Human's turn - minimize score
        let bestScore = Infinity;
        const emptyCells = getEmptyCells(board);

        for (const { row, col } of emptyCells) {
            // Make move
            board[row]![col] = humanPlayer;

            // Recursively evaluate
            const moveScore = minimax(
                board,
                depth + 1,
                true,
                botPlayer,
                humanPlayer,
                rows,
                cols,
            );

            // Undo move
            board[row]![col] = null;

            // Track best score
            bestScore = Math.min(bestScore, moveScore);
        }

        return bestScore;
    }
}

/**
 * Find the best move for the bot using minimax algorithm
 * @param board - Current game board state
 * @param botPlayer - The bot's player symbol (X or O)
 * @param rows - Number of rows in the board
 * @param cols - Number of columns in the board
 * @returns Best move coordinates {row, col} or null if no moves available
 */
export function findBestMove(
    board: CellValue[][],
    botPlayer: CellValue,
    rows: number,
    cols: number,
): { row: number; col: number } | null {
    const humanPlayer = getNextPlayer(botPlayer);
    let bestScore = -Infinity;
    let bestMove: { row: number; col: number } | null = null;

    // Create a deep copy of the board to avoid mutating the original
    const boardCopy = board.map(row => [...row]);

    const emptyCells = getEmptyCells(boardCopy);

    // If no empty cells, return null
    if (emptyCells.length === 0) {
        return null;
    }

    // Try all possible moves
    for (const { row, col } of emptyCells) {
        // Make move on copy
        boardCopy[row]![col] = botPlayer;

        // Evaluate this move using minimax
        const moveScore = minimax(
            boardCopy,
            0,
            false, // Next turn is human's (minimizing)
            botPlayer,
            humanPlayer,
            rows,
            cols,
        );

        // Undo move
        boardCopy[row]![col] = null;

        // Track the best move
        if (moveScore > bestScore) {
            bestScore = moveScore;
            bestMove = { row, col };
        }
    }

    return bestMove;
}
