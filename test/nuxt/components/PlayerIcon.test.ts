import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import PlayerIcon from '~/components/PlayerIcon.vue';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check PlayerIcon component', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('check component mounts', async () => {
        const wrapper = await mountSuspended(PlayerIcon);

        expect(wrapper.exists()).toBe(true);
    });

    it('check X icon renders', async () => {
        const wrapper = await mountSuspended(PlayerIcon, {
            props: {
                value: PLAYER_X,
            },
        });

        expect(wrapper.html()).toContain('lucide:x');
    });

    it('check O icon renders', async () => {
        const wrapper = await mountSuspended(PlayerIcon, {
            props: {
                value: PLAYER_O,
            },
        });

        expect(wrapper.html()).toContain('lucide:circle');
    });

    it('check null value renders nothing', async () => {
        const wrapper = await mountSuspended(PlayerIcon, {
            props: {
                value: null,
            },
        });

        const icon = wrapper.find('svg');
        expect(icon.exists()).toBe(false);
    });
});
