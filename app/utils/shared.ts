import type { CellValue } from '~/types/game.types';

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
