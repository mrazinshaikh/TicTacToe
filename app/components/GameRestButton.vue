<template>
    <UButton
        variant="solid"
        color="neutral"
        icon="i-lucide-refresh-cw"
        label="Reset Game"
        @click="handleResetGame"
    />
</template>

<script setup lang="ts">
const game = useGameStore();

function handleResetGame(): void {
    game.resetGame();
}
</script>
