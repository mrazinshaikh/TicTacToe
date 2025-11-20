// import Particles from '@tsparticles/vue3';
// import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.

// import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

export default defineNuxtPlugin(async (nuxtApp) => {
    /* v8 ignore if -- @preserve */
    if (import.meta.server) {
        // no-op stub for SSR.
        nuxtApp.vueApp.component('vue-particles', { render: () => null });
    }

    if (import.meta.client) {
        // Lazy load tsparticles for better code-splitting.
        const [{ default: Particles }, { loadFull }] = await Promise.all([
            import('@tsparticles/vue3'),
            import('tsparticles'),
        ]);
        nuxtApp.vueApp.use(Particles, {
            init: async (engine) => {
                // await loadSlim(engine);
                await loadFull(engine);
            },
        });
    }
});
