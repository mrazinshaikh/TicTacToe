import { describe, expect, it } from 'vitest';
import { EMPTY_CELL, PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { CellValue } from '~/types/game.types';

describe('check checkWin', () => {
    it('check board full draw', () => {
        let board: CellValue[][] = [
            [PLAYER_X, PLAYER_O, PLAYER_O],
            [PLAYER_O, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_O, PLAYER_O],
        ];

        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);
        expect(checkWin(3, 3, board, PLAYER_O)).toBe(false);

        board = [
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_O, PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);

        board = [
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_O, PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_X, PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
        ];

        expect(checkWin(5, 5, board, PLAYER_X)).toBe(false);
        expect(checkWin(5, 5, board, PLAYER_O)).toBe(false);
    });

    it('check board empty ', () => {
        let board: CellValue[][] = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);
        expect(checkWin(3, 3, board, PLAYER_O)).toBe(false);

        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);
    });

    it('check rows win ', () => {
        let board: CellValue[][] = [
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 0,
            resultMatrix: [
                [true, true, true],
                [false, false, false],
                [false, false, false],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        // row 2
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 1,
            resultMatrix: [
                [false, false, false],
                [true, true, true],
                [false, false, false],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        // row 3
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 2,
            resultMatrix: [
                [false, false, false],
                [false, false, false],
                [true, true, true],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        // 4x4 row 1
        board = [
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 0,
            resultMatrix: [
                [true, true, true, true],
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);

        // row 2
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 1,
            resultMatrix: [
                [false, false, false, false],
                [true, true, true, true],
                [false, false, false, false],
                [false, false, false, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);

        // row 3
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 2,
            resultMatrix: [
                [false, false, false, false],
                [false, false, false, false],
                [true, true, true, true],
                [false, false, false, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);

        // row 4
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
        ];

        expect(checkWin(4, 4, board, PLAYER_O)).toStrictEqual({
            type: 'row',
            index: 3,
            resultMatrix: [
                [false, false, false, false],
                [false, false, false, false],
                [false, false, false, false],
                [true, true, true, true],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);
    });

    it('check cols win', () => {
        let board: CellValue[][] = [
            [PLAYER_O, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_O, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'col',
            index: 0,
            resultMatrix: [
                [true, false, false],
                [true, false, false],
                [true, false, false],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        // col 2
        board = [
            [EMPTY_CELL, PLAYER_O, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_O, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_O, EMPTY_CELL],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'col',
            index: 1,
            resultMatrix: [
                [false, true, false],
                [false, true, false],
                [false, true, false],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        // col 3
        board = [
            [EMPTY_CELL, EMPTY_CELL, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_O],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_O],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'col',
            index: 2,
            resultMatrix: [
                [false, false, true],
                [false, false, true],
                [false, false, true],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        // 4x4 col 1
        board = [
            [PLAYER_X, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_X, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_X, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_X, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toStrictEqual({
            type: 'col',
            index: 0,
            resultMatrix: [
                [true, false, false, false],
                [true, false, false, false],
                [true, false, false, false],
                [true, false, false, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);

        // 4x4 col 2
        board = [
            [EMPTY_CELL, PLAYER_X, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_X, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_X, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_X, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toStrictEqual({
            type: 'col',
            index: 1,
            resultMatrix: [
                [false, true, false, false],
                [false, true, false, false],
                [false, true, false, false],
                [false, true, false, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);

        // 4x4 col 3
        board = [
            [EMPTY_CELL, EMPTY_CELL, PLAYER_X, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_X, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_X, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_X, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toStrictEqual({
            type: 'col',
            index: 2,
            resultMatrix: [
                [false, false, true, false],
                [false, false, true, false],
                [false, false, true, false],
                [false, false, true, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);

        // 4x4 col 4
        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, PLAYER_X],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, PLAYER_X],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, PLAYER_X],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, PLAYER_X],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toStrictEqual({
            type: 'col',
            index: 3,
            resultMatrix: [
                [false, false, false, true],
                [false, false, false, true],
                [false, false, false, true],
                [false, false, false, true],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);
    });

    it('check diagonal win', () => {
        let board: CellValue[][] = [
            [PLAYER_O, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_O, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_O],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'diag',
            index: 0,
            resultMatrix: [
                [true, false, false],
                [false, true, false],
                [false, false, true],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        board = [
            [PLAYER_O, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_O, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_O, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, PLAYER_O],
        ];

        expect(checkWin(4, 4, board, PLAYER_O)).toStrictEqual({
            type: 'diag',
            index: 0,
            resultMatrix: [
                [true, false, false, false],
                [false, true, false, false],
                [false, false, true, false],
                [false, false, false, true],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_X)).toBe(false);
    });

    it('check anti-diagonal win', () => {
        let board: CellValue[][] = [
            [EMPTY_CELL, EMPTY_CELL, PLAYER_O],
            [EMPTY_CELL, PLAYER_O, EMPTY_CELL],
            [PLAYER_O, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(3, 3, board, PLAYER_O)).toStrictEqual({
            type: 'anti-diag',
            index: 0,
            resultMatrix: [
                [false, false, true],
                [false, true, false],
                [true, false, false],
            ],
        });
        expect(checkWin(3, 3, board, PLAYER_X)).toBe(false);

        board = [
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, PLAYER_X],
            [EMPTY_CELL, EMPTY_CELL, PLAYER_X, EMPTY_CELL],
            [EMPTY_CELL, PLAYER_X, EMPTY_CELL, EMPTY_CELL],
            [PLAYER_X, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ];

        expect(checkWin(4, 4, board, PLAYER_X)).toStrictEqual({
            type: 'anti-diag',
            index: 0,
            resultMatrix: [
                [false, false, false, true],
                [false, false, true, false],
                [false, true, false, false],
                [true, false, false, false],
            ],
        });
        expect(checkWin(4, 4, board, PLAYER_O)).toBe(false);
    });
});
