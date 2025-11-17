<template>
    <div class="">
        <div class="flex items-center justify-center p-4 mb-12">
            <h1 class="text-5xl">
                Tic Tac Toe
            </h1>
        </div>

        <GameBoard />

        <div class="w-full mt-4">
            <div class="w-max mx-auto flex items-center justify-center gap-2">
                <template v-if="game.winner">
                    <PlayerIcon
                        :value="game.winner"
                        class="size-6"
                    />
                    <span class="text-lg font-bold"> Won the Game! </span>
                </template>
                <template v-else-if="game.isDraw">
                    <span class="text-lg font-bold"> It's a Draw! </span>
                </template>
                <template v-else>
                    <PlayerIcon
                        :value="game.currentPlayer"
                        class="size-6"
                    />
                    <span class="text-lg"> Your Turn </span>
                </template>
            </div>
        </div>

        <div class="w-full mt-4">
            <div class="w-max mx-auto flex items-center justify-center gap-2">
                <UButton
                    variant="solid"
                    color="neutral"
                    icon="i-lucide-refresh-cw"
                    label="Reset Game"
                    @click="handleResetGame"
                />
            </div>
        </div>

        <TransitionGroup name="fade">
            <LazyResultGameWon v-if="game.winner && game.isResultOpen" />
            <LazyResultGameDraw v-else-if="game.isDraw && game.isResultOpen" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
const game = useGameStore();

function handleResetGame(): void {
    game.resetGame();
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
