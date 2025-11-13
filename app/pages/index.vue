<template>
    <div class="h-full min-h-screen w-screen bg-pancho-200">
        <div class="flex items-center justify-center p-4 mb-12">
            <h1 class="text-5xl">
                Tic Tac Toe
            </h1>
        </div>

        <GameBoard :board="game.board" />

        <div class="w-full mt-4">
            <div class="w-max mx-auto flex items-center justify-center gap-2">
                <PlayerIcon class="size-6" />
                <span class="text-lg"> Your Turn </span>
            </div>
        </div>

        <div class="w-full mt-4">
            <div class="w-max mx-auto flex items-center justify-center gap-2">
                <UButton
                    variant="solid"
                    color="neutral"
                    icon="i-lucide-refresh-cw"
                    label="Reset Game"
                    @click="game.board.resetGame"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const game = useGame();

provide(GameProvideKey, game);
</script>

<style></style>
