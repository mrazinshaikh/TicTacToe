// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/fonts',
        '@vite-pwa/nuxt',
        '@nuxt/test-utils/module',
    ],
    devtools: { enabled: process.env.NODE_ENV === 'development' },

    app: {
        head: {
            htmlAttrs: {
                // enforce dark mode by default.
                class: 'dark',
                lang: 'en',
            },
        },
    },

    css: ['./app/assets/css/main.css'],

    appConfig: {
        ui: {
            colors: {
                primary: 'pancho',
                success: 'pancho',
            },
            button: {
                slots: {
                    base: 'cursor-pointer',
                },
            },
        },
    },

    build: {
        analyze: true,
    },
    compatibilityDate: '2025-07-15',

    nitro: {
        prerender: {
            routes: [
                '/',
            ],
        },
    },

    vite: {
        css: {
            devSourcemap: false,
        },
        build: {
            sourcemap: false,
        },
        plugins: [
            tailwindcss(),
        ],
        define: {
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
        },
    },

    typescript: {
        typeCheck: true,
        tsConfig: {
            include: [
                '../**/*.ts',
                // ...(isTest ? ['../test/**/*'] : []),
            ],
        },
    },
    // debug: true,

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
            },
        },
    },
    icon: {
        provider: 'none',
        clientBundle: {
            icons: [
                'lucide:plus',
                'lucide:minus',
            ],
            scan: true,
        },
        customCollections: [
            {
                prefix: 'custom',
                dir: './app/assets/icons',
            },
        ],
    },

    pwa: {
        registerType: 'autoUpdate',
        devOptions: {
            enabled: true,
        },

        manifest: {
            name: 'Tic Tac Toe - By MRazinShaikh',
            theme_color: '#efcca2',
            icons: [
                {
                    src: 'board-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'board-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: 'board-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
            screenshots: [
                {
                    src: 'sample.jpg',
                    type: 'image/jpeg',
                    sizes: '1870x961',
                    form_factor: 'narrow',
                },
                {
                    src: 'sample.jpg',
                    type: 'image/jpeg',
                    sizes: '1870x961',
                    form_factor: 'wide',
                },
            ],
        },

        workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,woff,woff2,json}'],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
        },

        client: {
            installPrompt: true,
            periodicSyncForUpdates: 86400,
        },
    },
});
