<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Tic Tac Toe - Play Tic Tac Toe Online',
    description:
        'Play Tic Tac Toe online for free. A simple and fun game to play with your family and friends.',
    ogTitle: 'Tic Tac Toe - Play Tic Tac Toe Online',
    ogDescription:
        'Play Tic Tac Toe online for free. A simple and fun game to play with your family and friends.',
    ogImage: 'https://tic-tac-toe-mrazinshaikh.com/board.png',
    ogUrl: 'https://tic-tac-toe-mrazinshaikh.com',
    ogType: 'website',
    ogLocale: 'en_US',
    ogSiteName: 'Tic Tac Toe',
    ogLocaleAlternate: ['en_US', 'en'],
});
</script>
