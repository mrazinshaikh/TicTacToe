import Particles from '@tsparticles/vue3';
import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.

// import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Particles, {
        init: async (engine) => {
            // await loadSlim(engine);
            await loadFull(engine);
        },
    });
});
