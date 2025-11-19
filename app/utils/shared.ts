import type { CellValue, Player } from '~/types/game.types';
import { PLAYER_X, PLAYER_O } from '~/constants/game.constants';

/**
 * Initialize a 2D matrix for the game board
 * This is a generic function that can create matrices of different types
 */
export function initBoardMatrix<T extends CellValue | boolean>(
    rows: number,
    cols: number,
    defaultValue: T,
): T extends boolean ? boolean[][] : CellValue[][] {
    return Array.from({ length: Number(rows) }, () =>
        Array(Number(cols)).fill(defaultValue),
    ) as T extends boolean ? boolean[][] : CellValue[][];
}

/**
 * Get the next player in turn
 */
export const getNextPlayer = (currentPlayer: CellValue): Player => {
    return currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
};

/**
 * Validate if a value is a valid player
 *
 * @deprecated - NOT IN USE.
 */
export const isValidPlayer = (value: unknown): value is Player => {
    return value === PLAYER_X || value === PLAYER_O;
};
