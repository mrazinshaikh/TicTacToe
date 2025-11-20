import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import MRazinShaikhGithub from '~/components/Credits/MRazinShaikhGithub.vue';

describe('check MRazinShaikhGithub credit link', () => {
    it('renders link to GitHub profile', async () => {
        const wrapper = await mountSuspended(MRazinShaikhGithub);

        const link = wrapper.find('a');
        expect(link.exists()).toBe(true);
        expect(link.text()).toBe('MRazinShaikh');
        expect(link.attributes('href')).toBe('https://github.com/MRazinShaikh');
        expect(link.attributes('target')).toBe('_blank');
    });
});
