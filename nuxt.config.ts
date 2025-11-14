// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/ui'],
    devtools: { enabled: process.env.NODE_ENV === 'development' },

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
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
            },
        },
    },
});
