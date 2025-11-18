// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
    devtools: { enabled: process.env.NODE_ENV === 'development' },

    app: {
        head: {
            htmlAttrs: {
                // enforce dark mode by default.
                class: 'dark',
            },
        },
    },

    css: ['./app/assets/css/main.css'],
    compatibilityDate: '2025-07-15',

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

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
            },
        },
    },
    icon: {
        customCollections: [
            {
                prefix: 'custom',
                dir: './app/assets/icons',
            },
        ],
    },
});
