import type { CellValue, BoardState } from '~/types/game.types';
import { initBoardMatrix } from '~/utils/shared';
import { EMPTY_CELL } from '~/constants/game.constants';

/**
 * Composable for managing board state
 * Pure board data management without game logic
 */
export const useBoardState = (rows: number, cols: number): BoardState => {
    const data = ref<CellValue[][]>(initBoardMatrix(rows, cols, EMPTY_CELL));

    return {
        data,
        rows,
        cols,
    };
};

/**
 * Get cell value from board state
 * Works with BoardState composable (ref-based)
 */
export const getBoardStateCellValue = (board: BoardState, row: number, col: number): CellValue => {
    return board.data.value[row]?.[col] ?? EMPTY_CELL;
};

/**
 * Set cell value on board
 */
export const setCellValue = (
    board: BoardState,
    row: number,
    col: number,
    value: CellValue,
): void => {
    if (board.data.value[row]) {
        board.data.value[row]![col] = value;
    }
};

/**
 * Reset board to initial state
 */
export const resetBoard = (board: BoardState): void => {
    board.data.value = initBoardMatrix(board.rows, board.cols, EMPTY_CELL);
};
