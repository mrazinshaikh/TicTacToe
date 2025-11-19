import { describe, expect, it } from 'vitest';
import { EMPTY_CELL, PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check shared utils', () => {
    it('check initBoardMatrix', () => {
        expect(initBoardMatrix(3, 3, false)).toStrictEqual([
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ]);
        expect(initBoardMatrix(3, 3, EMPTY_CELL)).toStrictEqual([
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ]);
        expect(initBoardMatrix(4, 4, PLAYER_O)).toStrictEqual([
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
            [PLAYER_O, PLAYER_O, PLAYER_O, PLAYER_O],
        ]);
        expect(initBoardMatrix(5, 5, PLAYER_X)).toStrictEqual([
            [PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X],
            [PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X, PLAYER_X],
        ]);
    });

    it('check getNextPlayer', () => {
        expect(getNextPlayer(PLAYER_X)).toBe(PLAYER_O);
        expect(getNextPlayer(PLAYER_O)).toBe(PLAYER_X);
    });

    it('check isValidPlayer', () => {
        expect(isValidPlayer(PLAYER_X)).toBe(true);
        expect(isValidPlayer(PLAYER_O)).toBe(true);
        expect(isValidPlayer(EMPTY_CELL)).toBe(false);
        expect(isValidPlayer(null)).toBe(false);
    });
});
