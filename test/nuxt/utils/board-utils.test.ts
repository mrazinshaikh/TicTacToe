import { describe, expect, it } from 'vitest';
import { EMPTY_CELL, PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { CellValue } from '~/types/game.types';

describe('check board utils', () => {
    it('check isCellEmpty', () => {
        const board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_X, PLAYER_X],
        ];

        // row 1
        expect(isCellEmpty(board, 0, 0)).toBe(true);
        expect(isCellEmpty(board, 0, 1)).toBe(true);
        expect(isCellEmpty(board, 0, 2)).toBe(true);

        // row 2
        expect(isCellEmpty(board, 1, 0)).toBe(false);
        expect(isCellEmpty(board, 1, 1)).toBe(false);
        expect(isCellEmpty(board, 1, 2)).toBe(false);

        // row 3
        expect(isCellEmpty(board, 2, 0)).toBe(false);
        expect(isCellEmpty(board, 2, 1)).toBe(false);
        expect(isCellEmpty(board, 2, 2)).toBe(false);
    });

    it('check isBoardFull', () => {
        const fullBoard = [
            [PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_X, PLAYER_X],
        ];

        expect(isBoardFull(fullBoard)).toBe(true);

        const emptyBoard = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];
        expect(isBoardFull(emptyBoard)).toBe(false);
    });

    it('check getEmptyCells', () => {
        // row 1
        let board: CellValue[][] = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_X, PLAYER_X],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },
        ]);

        // row 2
        board = [
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_X, PLAYER_X, PLAYER_X],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },
        ]);

        // row 3
        board = [
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_X, PLAYER_X],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
        ]);

        // column 1
        board = [
            [EMPTY_CELL, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, PLAYER_X, PLAYER_X],
            [EMPTY_CELL, PLAYER_O, PLAYER_O],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 0 },
            { row: 1, col: 0 },
            { row: 2, col: 0 },
        ]);

        // column 2
        board = [
            [PLAYER_O, EMPTY_CELL, PLAYER_O],
            [PLAYER_X, EMPTY_CELL, PLAYER_X],
            [PLAYER_O, EMPTY_CELL, PLAYER_O],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 1 },
            { row: 1, col: 1 },
            { row: 2, col: 1 },
        ]);

        // column 3
        board = [
            [PLAYER_O, PLAYER_O, EMPTY_CELL],
            [PLAYER_X, PLAYER_X, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, EMPTY_CELL],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 2 },
            { row: 1, col: 2 },
            { row: 2, col: 2 },
        ]);

        // diagonal 1
        board = [
            [EMPTY_CELL, PLAYER_O, PLAYER_X],
            [PLAYER_X, EMPTY_CELL, PLAYER_X],
            [PLAYER_O, PLAYER_O, EMPTY_CELL],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 0 },
            { row: 1, col: 1 },
            { row: 2, col: 2 },
        ]);

        // diagonal 2 (anti-diagonal)
        board = [
            [PLAYER_X, PLAYER_O, EMPTY_CELL],
            [PLAYER_X, EMPTY_CELL, PLAYER_O],
            [EMPTY_CELL, PLAYER_O, PLAYER_X],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 2 },
            { row: 1, col: 1 },
            { row: 2, col: 0 },
        ]);

        // full
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(getEmptyCells(board)).toStrictEqual([
            { row: 0, col: 0 },
            { row: 0, col: 1 },
            { row: 0, col: 2 },

            { row: 1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: 2 },

            { row: 2, col: 0 },
            { row: 2, col: 1 },
            { row: 2, col: 2 },
        ]);
    });

    it('check isValidCoordinate', () => {
        const board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(isValidCoordinate(board, 0, 0)).toBe(true);
        expect(isValidCoordinate(board, 0, 1)).toBe(true);
        expect(isValidCoordinate(board, 0, 2)).toBe(true);
        expect(isValidCoordinate(board, 1, 0)).toBe(true);
        expect(isValidCoordinate(board, 1, 1)).toBe(true);
        expect(isValidCoordinate(board, 1, 2)).toBe(true);
        expect(isValidCoordinate(board, 2, 0)).toBe(true);
        expect(isValidCoordinate(board, 2, 1)).toBe(true);
        expect(isValidCoordinate(board, 2, 2)).toBe(true);

        expect(isValidCoordinate(board, 3, 0)).toBe(false);
        expect(isValidCoordinate(board, 0, 3)).toBe(false);
        expect(isValidCoordinate(board, 3, 3)).toBe(false);
    });

    it('check getCellValue', () => {
        const board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_X, PLAYER_X],
        ];

        expect(getCellValue(board, 0, 0)).toBe(EMPTY_CELL);
        expect(getCellValue(board, 0, 1)).toBe(EMPTY_CELL);
        expect(getCellValue(board, 0, 2)).toBe(EMPTY_CELL);

        expect(getCellValue(board, 1, 0)).toBe(PLAYER_O);
        expect(getCellValue(board, 1, 1)).toBe(PLAYER_O);
        expect(getCellValue(board, 1, 2)).toBe(PLAYER_O);

        expect(getCellValue(board, 2, 0)).toBe(PLAYER_X);
        expect(getCellValue(board, 2, 1)).toBe(PLAYER_X);
        expect(getCellValue(board, 2, 2)).toBe(PLAYER_X);

        expect(getCellValue(board, 3, 0)).toBe(EMPTY_CELL);
        expect(getCellValue(board, 0, 3)).toBe(EMPTY_CELL);
        expect(getCellValue(board, 3, 3)).toBe(EMPTY_CELL);
    });
});
