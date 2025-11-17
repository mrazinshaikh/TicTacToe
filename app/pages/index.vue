<template>
    <div class="h-full min-h-screen w-screen bg-pancho-200">
        <div class="flex flex-col items-center justify-center p-4 mb-12 gap-4">
            <h1 class="text-5xl">
                Tic Tac Toe
            </h1>
            <div class="flex items-center gap-2">
                <UButton
                    :variant="gameMode.gameMode.value === 'vsPlayer' ? 'solid' : 'outline'"
                    color="primary"
                    label="Player vs Player"
                    @click="handleModeChange('vsPlayer')"
                />
                <UButton
                    :variant="gameMode.gameMode.value === 'vsBot' ? 'solid' : 'outline'"
                    color="primary"
                    label="Player vs Bot"
                    @click="handleModeChange('vsBot')"
                />
            </div>
        </div>

        <GameBoard
            :board="game.board.value"
            :current-player="game.currentPlayer.value"
            :winning-cells="game.resultData.value"
            :is-loading="game.isLoading.value"
            :is-board-loading="game.isBoardLoading.value"
            :rows="game.rows"
            :cols="game.cols"
            @cell-clicked="handleCellClick"
        />

        <div class="w-full mt-4">
            <div class="w-max mx-auto flex items-center justify-center gap-2">
                <template v-if="game.winner.value">
                    <PlayerIcon
                        :value="game.winner.value"
                        class="size-6"
                    />
                    <span class="text-lg font-bold"> Won the Game! </span>
                </template>
                <template v-else-if="game.isDraw.value">
                    <span class="text-lg font-bold"> It's a Draw! </span>
                </template>
                <template v-else>
                    <TransitionGroup
                        name="fade"
                        appear
                    >
                        <PlayerIcon
                            :key="`current_player_${game.currentPlayer.value}`"
                            :value="game.currentPlayer.value"
                            class="size-6"
                        />
                        <span
                            :key="`current_player_text_${game.currentPlayer.value}`"
                            class="text-lg"
                        >
                            {{ gameMode.isVsBot && game.currentPlayer.value === 'O' ? "Bot's Turn" : 'Your Turn' }}
                        </span>
                    </TransitionGroup>
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

        <LazyResultGameWon
            v-if="game.winner.value && isResultOpen"
            @close="isResultOpen = false"
        />
        <LazyResultGameDraw
            v-else-if="game.isDraw.value && isResultOpen"
            @close="isResultOpen = false"
        />
    </div>
</template>

<script lang="ts" setup>
import { GameProvideKey } from '~/utils/shared';
import type { GameMode } from '~/types/game.types';

// Game mode management
const gameMode = useGameMode('vsPlayer');

// Initialize game with reactive mode
const game = useGame(gameMode.gameMode);
const isResultOpen = ref(true);

provide(GameProvideKey, game);

const handleCellClick = (rowIndex: number, colIndex: number): void => {
    // In vsBot mode, prevent human from clicking when it's bot's turn
    if (gameMode.isVsBot.value) {
        // Bot is 'O' (starting player), human is 'X'
        if (game.currentPlayer.value === 'O') {
            return; // It's bot's turn, ignore human clicks
        }
    }
    game.makeMove(rowIndex, colIndex);
};

const handleResetGame = (): void => {
    game.resetGame();
};

const handleModeChange = (mode: GameMode): void => {
    gameMode.setGameMode(mode);
    // Reset game when switching modes
    game.resetGame();
};
</script>

<style></style>
