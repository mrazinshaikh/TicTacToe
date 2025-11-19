import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';

/**
 * ? Warning: The Vitest environment nuxt defines the "transformMode". This options was deprecated in Vitest 4 and will be removed in the next major version. Please, use "viteEnvironment" instead.
 *
 * ? Open Issue:https://github.com/nuxt/test-utils/issues/1482
 */
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
