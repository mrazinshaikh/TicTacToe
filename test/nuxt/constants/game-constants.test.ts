import { describe, expect, it } from 'vitest';
import {
    PLAYER_O, PLAYER_X,
    DEFAULT_BOARD_COLS, DEFAULT_BOARD_ROWS,
    DEFAULT_STARTING_PLAYER,
    EMPTY_CELL,
} from '~/constants/game.constants';

describe('check game constants', () => {
    it('check players', () => {
        expect(PLAYER_X).toBe('X');
        expect(PLAYER_O).toBe('O');
        expect(EMPTY_CELL).toBeNull();
    });

    it('check board dimensions', () => {
        expect(DEFAULT_BOARD_ROWS).toBe(3);
        expect(DEFAULT_BOARD_COLS).toBe(3);
    });

    it('check default starting player', () => {
        expect(DEFAULT_STARTING_PLAYER).toBe(PLAYER_O);
    });
});
