import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import GameScore from '~/components/GameScore.vue';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check GameScore component', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('check component mounts', async () => {
        const wrapper = await mountSuspended(GameScore);

        expect(wrapper.exists()).toBe(true);
    });

    it('check initial score display', async () => {
        const wrapper = await mountSuspended(GameScore);

        expect(wrapper.text()).toContain('Player O:');
        expect(wrapper.text()).toContain('Player X:');
        expect(wrapper.text()).toContain('0');
    });

    it('check active player highlight', async () => {
        const wrapper = await mountSuspended(GameScore);
        const game = useGameStore();

        game.currentPlayer = PLAYER_O;
        await wrapper.vm.$nextTick();

        const scoreBlocks = wrapper.findAll('.score-block');
        expect(scoreBlocks[0]?.classes()).toContain('active');
        expect(scoreBlocks[1]?.classes()).not.toContain('active');
    });

    it('check score updates', async () => {
        const wrapper = await mountSuspended(GameScore);
        const gameScore = useGameScoreStore();

        gameScore.updateScore(PLAYER_X);
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Player X:');
        expect(wrapper.text()).toContain('1');
    });

    it('check player X highlight when active', async () => {
        const wrapper = await mountSuspended(GameScore);
        const game = useGameStore();

        game.currentPlayer = PLAYER_X;
        await wrapper.vm.$nextTick();

        const scoreBlocks = wrapper.findAll('.score-block');
        expect(scoreBlocks[1]?.classes()).toContain('active');
        expect(scoreBlocks[0]?.classes()).not.toContain('active');
    });

    it('check multiple score updates', async () => {
        const wrapper = await mountSuspended(GameScore);
        const gameScore = useGameScoreStore();

        gameScore.updateScore(PLAYER_O);
        gameScore.updateScore(PLAYER_O);
        gameScore.updateScore(PLAYER_X);
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Player O:');
        expect(wrapper.text()).toContain('2');
    });
});
