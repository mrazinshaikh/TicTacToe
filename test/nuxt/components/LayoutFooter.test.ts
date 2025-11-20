import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import Footer from '~/components/Layout/Footer.vue';

describe('check Footer component', () => {
    beforeEach(() => {
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('renders credit and license links', async () => {
        const wrapper = await mountSuspended(Footer);

        expect(wrapper.text()).toContain('Made With');
        expect(wrapper.text()).toContain('GNU GPL v3.0');

        const licenseLink = wrapper.find('a[href="https://github.com/mrazinshaikh/TicTacToe/blob/main/LICENSE"]');
        expect(licenseLink.exists()).toBe(true);

        const repoLink = wrapper.find('a[href="https://github.com/mrazinshaikh/TicTacToe"]');
        expect(repoLink.exists()).toBe(true);
    });

    it('customize helper replaces fill colors', async () => {
        const wrapper = await mountSuspended(Footer);
        const svgContent = '<svg><path fill="#000" /></svg>';

        const customized = (wrapper.vm as unknown as { customize: (content: string) => string }).customize(svgContent);
        expect(customized).toContain('#FF5733');
        expect(customized).not.toContain('#000');
    });
});
