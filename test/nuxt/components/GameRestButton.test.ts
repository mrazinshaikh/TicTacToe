import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import GameRestButton from '~/components/GameRestButton.vue';

describe('check GameRestButton component', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('check component mounts', async () => {
        const wrapper = await mountSuspended(GameRestButton);

        expect(wrapper.exists()).toBe(true);
    });

    it('check button label', async () => {
        const wrapper = await mountSuspended(GameRestButton);

        expect(wrapper.text()).toContain('Restart Game');
    });

    it('check button click resets game', async () => {
        const wrapper = await mountSuspended(GameRestButton);
        const game = useGameStore();

        // Make some moves
        game.makeMove(0, 0);
        game.makeMove(1, 1);

        expect(game.isFreshBoard).toBe(false);

        // Click reset button
        const button = wrapper.find('button');
        await button.trigger('click');

        expect(game.isFreshBoard).toBe(true);
    });
});
