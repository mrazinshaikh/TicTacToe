import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Header from '~/components/Layout/Header.vue';

describe('check Header component', () => {
    it('renders title and includes settings control', async () => {
        const wrapper = await mountSuspended(Header, {
            global: {
                stubs: {
                    LayoutGameSettings: {
                        template: '<div data-test="settings-stub" />',
                    },
                },
            },
        });

        expect(wrapper.text()).toContain('Tic Tac Toe');
        expect(wrapper.find('[data-test="settings-stub"]').exists()).toBe(true);
    });
});
