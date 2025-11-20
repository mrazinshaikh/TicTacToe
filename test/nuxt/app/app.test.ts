import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockNuxtImport } from '@nuxt/test-utils/runtime';
import { mount } from '@vue/test-utils';
import App from '~/app.vue';

const toastAddMock = vi.fn();
let pwaMock: {
    offlineReady: boolean;
    isPWAInstalled: boolean;
    install: ReturnType<typeof vi.fn>;
} | undefined;
let nuxtAppMock: {
    $pwa: typeof pwaMock;
    isHydrating: boolean;
    deferHydration: () => () => void;
    hooks: {
        hookOnce: ReturnType<typeof vi.fn>;
        callHookWith: ReturnType<typeof vi.fn>;
        callHook: ReturnType<typeof vi.fn>;
    };
};

mockNuxtImport('useToast', () => {
    return () => ({
        add: toastAddMock,
    });
});

mockNuxtImport('useNuxtApp', () => {
    return () => nuxtAppMock;
});

mockNuxtImport('useSeoMeta', () => vi.fn());

describe('check app root', () => {
    beforeEach(() => {
        toastAddMock.mockReset();
        pwaMock = {
            offlineReady: false,
            isPWAInstalled: true,
            install: vi.fn().mockResolvedValue({ outcome: 'accepted' }),
        };
        nuxtAppMock = {
            $pwa: pwaMock,
            isHydrating: false,
            deferHydration: () => () => {},
            hooks: {
                hookOnce: vi.fn(),
                callHookWith: vi.fn().mockResolvedValue(undefined),
                callHook: vi.fn().mockResolvedValue(undefined),
            },
        };
    });

    it('prompts install and handles dismissed outcome', async () => {
        const installMock = vi.fn().mockResolvedValue({ outcome: 'dismissed' });
        pwaMock = {
            offlineReady: false,
            isPWAInstalled: false,
            install: installMock,
        };
        nuxtAppMock.$pwa = pwaMock;

        const wrapper = mount(App, {
            global: {
                stubs: {
                    NuxtPwaManifest: { template: '<div />' },
                    UApp: { template: '<div><slot /></slot></div>' },
                    NuxtLayout: { template: '<div><slot /></slot></div>' },
                    NuxtPage: { template: '<div />' },
                },
            },
        });

        await wrapper.vm.$nextTick();

        const installToast = toastAddMock.mock.calls.find(
            ([payload]) => payload?.title === 'Ready to install !',
        )?.[0];

        expect(installToast).toBeTruthy();
        expect(installToast?.actions?.length).toBeGreaterThan(0);

        const action = installToast?.actions?.[0];
        await action?.onClick({
            preventDefault: vi.fn(),
        });

        expect(installMock).toHaveBeenCalled();
        expect(toastAddMock).toHaveBeenCalledWith(
            expect.objectContaining({
                title: 'Operation failed!',
                color: 'error',
            }),
        );
    });
});
