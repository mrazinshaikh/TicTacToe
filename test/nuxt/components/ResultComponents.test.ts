/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import ResultContainer from '~/components/Result/ResultContainer.vue';
import GameDraw from '~/components/Result/GameDraw.vue';
import GameWon from '~/components/Result/GameWon.vue';

describe('check Result components', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('ResultContainer renders slot and controls', async () => {
        const wrapper = await mountSuspended(ResultContainer, {
            slots: {
                default: '<div data-test="result-slot">Result Content</div>',
            },
            global: {
                stubs: {
                    UButton: {
                        props: ['label'],
                        template: '<button :data-label="label" @click="$emit(\'click\')"><slot /></button>',
                    },
                    GameRestButton: {
                        template: '<div data-test="reset-btn">Reset</div>',
                    },
                },
            },
        });

        expect(wrapper.find('[data-test="result-slot"]').exists()).toBe(true);

        expect(wrapper.find('button:not([data-label])').exists()).toBe(true);
        expect(wrapper.find('button[data-label="Close"]').exists()).toBe(true);
    });

    it(`GameDraw displays draw message`, async () => {
        const wrapper = await mountSuspended(GameDraw, {
            global: {
                stubs: {
                    ResultContainer: {
                        template: '<div data-test="container"><slot /></div>',
                    },
                },
            },
        });

        expect(wrapper.text()).toContain(`It's a Draw`);
        expect(wrapper.findComponent({ name: 'UIcon' }).exists()).toBe(true);
    });

    it('GameWon toggles blast flag after timeout', async () => {
        vi.useFakeTimers();
        const wrapper = await mountSuspended(GameWon, {
            global: {
                stubs: {
                    'ResultContainer': {
                        template: '<div data-test="container"><slot /></div>',
                    },
                    'PlayerIcon': {
                        template: '<div data-test="player-icon" />',
                    },
                    'ClientOnly': {
                        template: '<div><slot /></div>',
                    },
                    'vue-particles': {
                        template: '<div data-test="particles" />',
                    },
                },
            },
        });

        expect(wrapper.text()).toContain('You Won');
        expect((wrapper.vm as any).blast).toBe(true);

        vi.advanceTimersByTime(5000);
        await wrapper.vm.$nextTick();

        expect((wrapper.vm as any).blast).toBe(false);
        vi.useRealTimers();
    });
});
