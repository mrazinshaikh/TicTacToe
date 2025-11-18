<template>
    <div class="">
        <ClientOnly>
            <template #default>
                <GameScore />
                <GameBoard />
                <GameStatus />

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
            </template>
            <template #fallback>
                <GameScoreSkeleton />
                <GameBoardSkeleton />
            </template>
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>
import GameStatus from '~/components/GameStatus.vue';

const game = useGameStore();
</script>
