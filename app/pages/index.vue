<template>
    <div class="">
        <GameScore />

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

        <Transition
            name="fade"
            appear
        >
            <div
                v-if="game.winner || !game.isFreshBoard"
                class="w-full mt-4"
            >
                <div class="w-max mx-auto">
                    <GameRestButton />
                </div>
            </div>
        </Transition>

        <TransitionGroup name="fade">
            <LazyResultGameWon v-if="game.winner && game.isResultOpen" />
            <LazyResultGameDraw v-else-if="game.isDraw && game.isResultOpen" />
        </TransitionGroup>
    </div>
</template>

<script lang="ts" setup>
const game = useGameStore();
</script>
