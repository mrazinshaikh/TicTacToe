<template>
    <div class="flex items-center justify-center p-4 mb-2">
        <div class="flex w-sm gap-4">
            <div
                class="score-block"
                :class="[{ active: game.currentPlayer === PLAYER_O }]"
            >
                <span>Player {{ PLAYER_O }}:</span>
                <span>{{ playerOScore }}</span>
            </div>
            <div
                class="score-block"
                :class="[{ active: game.currentPlayer === PLAYER_X }]"
            >
                <span>Player {{ PLAYER_X }}:</span>
                <span>{{ playerXScore }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

const game = useGameStore();
const gameScore = useGameScore();

const playerXScore = computed(() => gameScore.player_wins[PLAYER_X]);
const playerOScore = computed(() => gameScore.player_wins[PLAYER_O]);
</script>

<style scoped>
@reference "../assets/css/main.css";

.score-block {
    @apply flex flex-1 items-center justify-between rounded border border-pancho-400 px-3 transition-all duration-300;
}
.score-block.active {
    @apply bg-pancho-400 text-black;
}
</style>
