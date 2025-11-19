import { describe, expect, it } from 'vitest';
import { gameConfig, getDefaultGameConfig } from '~/config/game.config';
import { PLAYER_O } from '~/constants/game.constants';

describe('check game config', () => {
    it('check gameConfig', () => {
        expect(gameConfig).toStrictEqual({
            rows: 3,
            cols: 3,
            defaultPlayer: PLAYER_O,
        });
    });

    it('check getDefaultGameConfig', () => {
        expect(getDefaultGameConfig()).toStrictEqual({
            rows: 3,
            cols: 3,
            defaultPlayer: PLAYER_O,
        });
    });
});
