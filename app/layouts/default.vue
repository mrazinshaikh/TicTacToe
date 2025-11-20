<template>
    <div>
        <Header />

        <main class="min-h-[calc(100vh-198px)] md:min-h-[calc(100vh-150px)]">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from '~/components/Layout/Header.vue';

const Footer = defineAsyncComponent(() => import('~/components/Layout/Footer.vue'));
</script>
