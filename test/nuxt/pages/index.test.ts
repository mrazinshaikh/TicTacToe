import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import IndexPage from '~/pages/index.vue';

describe('check index page', () => {
    it('check component mounts', async () => {
        const wrapper = await mountSuspended(IndexPage);

        expect(wrapper.exists()).toBe(true);
    });

    it('check initial page structure', async () => {
        const wrapper = await mountSuspended(IndexPage);

        // Check if main components are rendered
        expect(wrapper.html()).toContain('Player O');
        expect(wrapper.html()).toContain('Player X');
    });

    it('check game board renders', async () => {
        const wrapper = await mountSuspended(IndexPage);

        // Board should be present
        const board = wrapper.find('.grid');
        expect(board.exists()).toBe(true);
    });

    it('check score display', async () => {
        const wrapper = await mountSuspended(IndexPage);

        // Both player scores should be visible
        expect(wrapper.text()).toContain('Player O:');
        expect(wrapper.text()).toContain('Player X:');
    });

    it('check current player status', async () => {
        const wrapper = await mountSuspended(IndexPage);

        // Should show current player's turn
        expect(wrapper.text()).toContain('Your Turn');
    });
});
