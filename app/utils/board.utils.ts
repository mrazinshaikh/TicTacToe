import type { CellValue } from '~/types/game.types';
import { EMPTY_CELL } from '~/constants/game.constants';

/**
 * Check if a cell is empty
 */
export const isCellEmpty = (board: CellValue[][], row: number, col: number): boolean => {
    return board[row]?.[col] === EMPTY_CELL;
};

/**
 * Check if the board is full (draw condition)
 */
export const isBoardFull = (board: CellValue[][]): boolean => {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < (board[row]?.length ?? 0); col++) {
            if (board[row]![col] === EMPTY_CELL) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Get all empty cells on the board
 *
 * @deprecated - NOT IN USE. might be useful for bot player.
 */
export const getEmptyCells = (board: CellValue[][]): Array<{ row: number; col: number }> => {
    const emptyCells: Array<{ row: number; col: number }> = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < (board[row]?.length ?? 0); col++) {
            if (board[row]![col] === EMPTY_CELL) {
                emptyCells.push({ row, col });
            }
        }
    }

    return emptyCells;
};

/**
 * Check if coordinates are valid for the board
 *
 * @deprecated - NOT IN USE. might be useful for bot player.
 */
export const isValidCoordinate = (board: CellValue[][], row: number, col: number): boolean => {
    return (
        row >= 0
        && row < board.length
        && col >= 0
        && col < (board[row]?.length ?? 0)
    );
};

/**
 * Get cell value safely
 */
export const getCellValue = (board: CellValue[][], row: number, col: number): CellValue => {
    if (!isValidCoordinate(board, row, col)) {
        return EMPTY_CELL;
    }
    return board[row]![col] ?? EMPTY_CELL;
};
