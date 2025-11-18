<template>
    <UButton
        variant="solid"
        color="neutral"
        icon="lucide:refresh-cw"
        label="Restart Game"
        @click="handleRestartGame"
    />
</template>

<script setup lang="ts">
const game = useGameStore();

function handleRestartGame(): void {
    game.resetGame();
}
</script>
