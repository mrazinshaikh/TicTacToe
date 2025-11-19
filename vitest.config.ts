import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';

export default defineConfig({
    test: {
        projects: [
            await defineVitestProject({
                // Nuxt tests: Place tests that rely on the Nuxt runtime environment in test/nuxt/ - these will run within a Nuxt runtime environment
                test: {
                    name: 'nuxt',
                    include: ['test/nuxt/**/*.{test,spec}.ts'],
                    environment: 'nuxt',
                },
            }),
        ],
    },
});
