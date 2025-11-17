<template>
    <UPopover
        modal
        dismissible
        arrow
    >
        <UButton
            icon="i-lucide-settings"
            color="neutral"
            variant="ghost"
        />

        <template #content>
            <div class="size-48 p-4">
                <UButton
                    icon="i-lucide-rotate-ccw"
                    class="w-full bg-pancho-400"
                    label="Reset"
                    @click.prevent="handleReset"
                />
            </div>
        </template>
    </UPopover>
</template>

<script setup lang="ts">
const game = useGameStore();
const gameScore = useGameScoreStore();

function handleReset() {
    if (!confirm('This action will reset all scores and the current game state. Are you sure?')) {
        return;
    }
    game.resetGame();
    gameScore.reset();
}
</script>
