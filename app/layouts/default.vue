<template>
    <div>
        <Header />

        <main class="min-h-[calc(100dvh-198px)] md:min-h-[calc(100dvh-150px)]">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '~/components/Layout/Header.vue';

const Footer = defineAsyncComponent(() => import('~/components/Layout/Footer.vue'));
</script>
