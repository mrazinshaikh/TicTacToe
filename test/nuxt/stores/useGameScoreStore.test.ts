import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check useGameScoreStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('check score state', () => {
        const gameScore = useGameScoreStore();

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 0,
            [PLAYER_X]: 0,
        });
    });

    it('check updateScore', () => {
        const gameScore = useGameScoreStore();

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 0,
            [PLAYER_X]: 0,
        });

        gameScore.updateScore(PLAYER_O);

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 1,
            [PLAYER_X]: 0,
        });

        gameScore.updateScore(PLAYER_X);

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 1,
            [PLAYER_X]: 1,
        });

        gameScore.updateScore(PLAYER_O);

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 2,
            [PLAYER_X]: 1,
        });
    });

    it('check reset', () => {
        const gameScore = useGameScoreStore();

        gameScore.updateScore(PLAYER_O);
        gameScore.updateScore(PLAYER_X);
        gameScore.updateScore(PLAYER_O);

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 2,
            [PLAYER_X]: 1,
        });

        gameScore.reset();

        expect(gameScore.player_wins).toStrictEqual({
            [PLAYER_O]: 0,
            [PLAYER_X]: 0,
        });
    });
});
