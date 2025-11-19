import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import GameStatus from '~/components/GameStatus.vue';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check GameStatus component', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('check component mounts', async () => {
        const wrapper = await mountSuspended(GameStatus);

        expect(wrapper.exists()).toBe(true);
    });

    it('check initial status shows current player turn', async () => {
        const wrapper = await mountSuspended(GameStatus);
        const game = useGameStore();

        game.resetGame();
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Your Turn');
    });

    it('check status when player O wins', async () => {
        const wrapper = await mountSuspended(GameStatus);
        const game = useGameStore();

        game.resetGame();
        game.winner = PLAYER_O;
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Won the Game!');
    });

    it('check status when player X wins', async () => {
        const wrapper = await mountSuspended(GameStatus);
        const game = useGameStore();

        game.resetGame();
        game.winner = PLAYER_X;
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Won the Game!');
    });

    it('check status on draw', async () => {
        const wrapper = await mountSuspended(GameStatus);
        const game = useGameStore();

        game.resetGame();
        game.isDraw = true;
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('It\'s a Draw!');
    });

    it('check status shows correct current player', async () => {
        const wrapper = await mountSuspended(GameStatus);
        const game = useGameStore();

        game.resetGame();
        game.currentPlayer = PLAYER_X;
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain('Your Turn');
    });
});
