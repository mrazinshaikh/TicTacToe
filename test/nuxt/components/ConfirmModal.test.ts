import { describe, expect, it } from 'vitest';
import { mountSuspended, renderSuspended } from '@nuxt/test-utils/runtime';
import ConfirmModal from '~/components/ConfirmModal.vue';

describe('check ConfirmModal component', () => {
    it('renders message and emits confirm', async () => {
        const data = await renderSuspended(ConfirmModal, {
            props: {
                message: 'Are you sure?',
                open: true,
            },
        });

        expect(data.html()).toContain('test-wrapper');

        const wrapper = await mountSuspended(ConfirmModal, {
            props: {
                message: 'Are you sure?',
                open: true,
            },
            global: {
                stubs: {
                    UModal: {
                        template: '<div><slot name="body" /><slot name="footer" /></div>',
                    },
                    UButton: {
                        template: '<button @click="$emit(\'click\')"><slot /></button>',
                    },
                },
            },
        });

        expect(wrapper.text()).toContain('Are you sure?');

        const buttons = wrapper.findAll('button');
        expect(buttons).toHaveLength(2);

        await buttons[1]?.trigger('click');

        expect(wrapper.emitted('confirm')).toBeTruthy();
        expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
    });

    it('emits cancel and closes modal', async () => {
        const wrapper = await mountSuspended(ConfirmModal, {
            props: {
                message: 'Cancel?',
                open: true,
            },
            global: {
                stubs: {
                    UModal: {
                        template: '<div><slot name="body" /><slot name="footer" /></div>',
                    },
                    UButton: {
                        template: '<button @click="$emit(\'click\')"><slot /></button>',
                    },
                },
            },
        });

        const buttons = wrapper.findAll('button');
        await buttons[0]?.trigger('click');

        expect(wrapper.emitted('cancel')).toBeTruthy();
        expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
    });
});
