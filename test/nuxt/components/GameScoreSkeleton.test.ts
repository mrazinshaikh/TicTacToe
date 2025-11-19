import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import GameScoreSkeleton from '~/components/GameScoreSkeleton.vue';

describe('check GameScoreSkeleton component', () => {
    it('check component mounts', async () => {
        const wrapper = await mountSuspended(GameScoreSkeleton);

        expect(wrapper.exists()).toBe(true);
    });

    it('check skeleton structure', async () => {
        const wrapper = await mountSuspended(GameScoreSkeleton);

        const skeletonBlocks = wrapper.findAll('.score-block-skeleton');
        expect(skeletonBlocks).toHaveLength(2);
    });

    it('check skeleton has animation', async () => {
        const wrapper = await mountSuspended(GameScoreSkeleton);

        const animatedElements = wrapper.findAll('.animate-pulse');
        expect(animatedElements.length).toBeGreaterThan(0);
    });
});
