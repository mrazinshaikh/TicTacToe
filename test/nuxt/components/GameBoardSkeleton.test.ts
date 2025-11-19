import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import GameBoardSkeleton from '~/components/GameBoardSkeleton.vue';

describe('check GameBoardSkeleton component', () => {
    it('check component mounts', async () => {
        const wrapper = await mountSuspended(GameBoardSkeleton);

        expect(wrapper.exists()).toBe(true);
    });

    it('check renders 9 skeleton cells', async () => {
        const wrapper = await mountSuspended(GameBoardSkeleton);

        const cells = wrapper.findAll('.animate-pulse');
        expect(cells).toHaveLength(9);
    });

    it('check grid layout', async () => {
        const wrapper = await mountSuspended(GameBoardSkeleton);

        const grid = wrapper.find('.grid');
        expect(grid.exists()).toBe(true);
    });
});
