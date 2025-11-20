/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import { defineComponent, h } from 'vue';
import GameSettings from '~/components/Layout/GameSettings.vue';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check GameSettings component', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('resets scores after confirming reset action', async () => {
        const wrapper = await mountSuspended(GameSettings);
        const gameScore = useGameScoreStore();

        gameScore.updateScore(PLAYER_O);
        gameScore.updateScore(PLAYER_X);

        (wrapper.vm as any).requestConfirm('resetScores');
        expect((wrapper.vm as any).confirmModal.open).toBe(true);

        (wrapper.vm as any).confirmAction();

        expect(gameScore.player_wins[PLAYER_O]).toBe(0);
        expect(gameScore.player_wins[PLAYER_X]).toBe(0);
    });

    it('saves new configuration when confirmed', async () => {
        const wrapper = await mountSuspended(GameSettings);
        const game = useGameStore();

        (wrapper.vm as any).form.size = 5;
        (wrapper.vm as any).form.defaultPlayer = PLAYER_X;

        (wrapper.vm as any).requestConfirm('saveConfig');
        (wrapper.vm as any).confirmAction();

        expect(game.rows).toBe(5);
        expect(game.cols).toBe(5);
        expect(game.defaultPlayer).toBe(PLAYER_X);
    });

    it('restores defaults when reset config is confirmed', async () => {
        const wrapper = await mountSuspended(GameSettings);
        const game = useGameStore();
        const closeSpy = vi.fn();

        (wrapper.vm as any).form.size = 4;
        (wrapper.vm as any).form.defaultPlayer = PLAYER_X;
        game.updateGameConfig({ rows: 4, cols: 4, defaultPlayer: PLAYER_X });

        (wrapper.vm as any).requestConfirm('resetConfig', closeSpy);
        (wrapper.vm as any).confirmAction();

        expect(game.rows).toBe(3);
        expect(game.cols).toBe(3);
        expect(game.defaultPlayer).toBe(PLAYER_O);
        expect((wrapper.vm as any).form.size).toBe(3);
        expect((wrapper.vm as any).form.defaultPlayer).toBe(PLAYER_O);
        expect(closeSpy).toHaveBeenCalled();
    });

    it('cancels pending action when cancelConfirm is called', async () => {
        const wrapper = await mountSuspended(GameSettings);

        (wrapper.vm as any).requestConfirm('resetScores');
        expect((wrapper.vm as any).pendingAction).toBeTruthy();

        (wrapper.vm as any).cancelConfirm();
        expect((wrapper.vm as any).pendingAction).toBeNull();
        expect((wrapper.vm as any).confirmModal.open).toBe(false);
    });

    it('renders popover actions and opens confirm modal via template buttons', async () => {
        const wrapper = await mountSuspended(GameSettings, {
            global: {
                stubs: uiStubComponents,
            },
        });

        const resetScoresButton = wrapper.find('button[data-label="Reset Scores"]');
        expect(resetScoresButton.exists()).toBe(true);
        await resetScoresButton.trigger('click');

        expect((wrapper.vm as any).confirmModal.open).toBe(true);
        expect((wrapper.vm as any).confirmModal.message).toContain('Reset stored scores');

        (wrapper.vm as any).cancelConfirm();
        await wrapper.vm.$nextTick();

        const saveButton = wrapper.find('button[data-label="Save"]');
        expect(saveButton.exists()).toBe(true);
        await saveButton.trigger('click');
        expect((wrapper.vm as any).confirmModal.message).toContain('Save settings');

        (wrapper.vm as any).cancelConfirm();
        await wrapper.vm.$nextTick();

        const resetConfigButton = wrapper.find('button[data-label="Reset to default"]');
        expect(resetConfigButton.exists()).toBe(true);
        await resetConfigButton.trigger('click');
        expect((wrapper.vm as any).confirmModal.message).toContain('Restore default configuration');
    });
});

const uiStubComponents = {
    UPopover: defineComponent({
        name: 'UPopoverStub',
        setup(_, { slots }) {
            const close = () => {
                /* noop close stub */
            };
            return () => {
                const contentProps: Record<string, string> = {};
                contentProps['data-test'] = 'popover-content';

                return h('div', [
                    slots.default?.(),
                    h('div', contentProps, slots.content?.({ close })),
                ]);
            };
        },
    }),
    UButton: defineComponent({
        name: 'UButtonStub',
        props: {
            label: {
                type: String,
                default: '',
            },
            icon: {
                type: String,
                default: '',
            },
        },
        emits: ['click'],
        setup(props, { emit, slots }) {
            return () => {
                const attrs: Record<string, unknown> = {
                    type: 'button',
                    onClick: (event: Event) => emit('click', event),
                };
                attrs['data-label'] = props.label || props.icon;

                return h('button', attrs, slots.default ? slots.default() : props.label || props.icon);
            };
        },
    }),
    UInputNumber: defineComponent({
        name: 'UInputNumberStub',
        props: {
            modelValue: {
                type: Number,
                default: 3,
            },
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            return () =>
                h('input', {
                    type: 'number',
                    value: props.modelValue,
                    onInput: (event: Event) => {
                        const target = event.target as HTMLInputElement;
                        emit('update:modelValue', Number(target.value));
                    },
                });
        },
    }),
    URadioGroup: defineComponent({
        name: 'URadioGroupStub',
        props: {
            modelValue: {
                type: String,
                default: '',
            },
            items: {
                type: Array,
                default: () => [],
            },
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            return () =>
                h(
                    'div',
                    props.items.map((item: any) => {
                        const attrs: Record<string, unknown> = {
                            type: 'button',
                            class: item.value === props.modelValue ? 'active' : '',
                            onClick: () => emit('update:modelValue', item.value),
                        };
                        attrs['data-player'] = item.value;
                        return h('button', attrs, item.label);
                    }),
                );
        },
    }),
    UTooltip: defineComponent({
        name: 'UTooltipStub',
        setup(_, { slots }) {
            return () => h('div', slots.default ? slots.default() : []);
        },
    }),
    ConfirmModal: defineComponent({
        name: 'ConfirmModalStub',
        props: {
            open: {
                type: Boolean,
                default: false,
            },
            message: {
                type: String,
                default: '',
            },
        },
        emits: ['update:open', 'confirm', 'cancel'],
        setup(props) {
            return () => {
                const attrs: Record<string, unknown> = {};
                attrs['data-test'] = 'confirm-modal';
                attrs['data-open'] = props.open;
                return h('div', attrs, props.message);
            };
        },
    }),
};
