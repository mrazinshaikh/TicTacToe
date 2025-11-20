import { describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { defineComponent, h, nextTick } from 'vue';
import DefaultLayout from '~/layouts/default.vue';

vi.mock('~/components/Layout/Header.vue', () => {
    const HeaderStub = defineComponent({
        name: 'HeaderStub',
        setup() {
            return () => h('header', { 'data-test': 'header-stub' }, 'Header Stub');
        },
    });
    return {
        __esModule: true,
        default: HeaderStub,
    };
});

vi.mock('~/components/Layout/Footer.vue', () => {
    const FooterStub = defineComponent({
        name: 'FooterStub',
        setup() {
            return () => h('footer', { 'data-test': 'footer-stub' }, 'Footer Stub');
        },
    });
    (FooterStub as unknown as { __isTeleport: boolean }).__isTeleport = false;
    return {
        __esModule: true,
        default: FooterStub,
        __isTeleport: false,
    };
});

describe('check default layout', () => {
    it('renders header, footer and content slot', async () => {
        const wrapper = await mountSuspended(DefaultLayout, {
            slots: {
                default: '<p>Page content</p>',
            },
        });

        await nextTick();

        expect(wrapper.find('[data-test="header-stub"]').exists()).toBe(true);
        expect(wrapper.find('[data-test="footer-stub"]').exists()).toBe(true);
        expect(wrapper.text()).toContain('Page content');
    });

    it('applies main layout constraints', async () => {
        const wrapper = await mountSuspended(DefaultLayout, {
            slots: {
                default: '<section data-test="content-slot">Main slot</section>',
            },
        });

        const main = wrapper.find('main');
        expect(main.exists()).toBe(true);
        expect(main.classes()).toContain('min-h-[calc(100dvh-198px)]');
        expect(wrapper.find('[data-test="content-slot"]').exists()).toBe(true);
    });
});
