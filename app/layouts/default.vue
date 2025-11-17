<template>
    <div>
        <Header />

        <main class="min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-150px)]">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import Footer from '~/components/Layout/Footer.vue';
import Header from '~/components/Layout/Header.vue';
</script>
