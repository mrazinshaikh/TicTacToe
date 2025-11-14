<template>
    <div class="h-full min-h-screen w-screen bg-pancho-200">
        <div class="flex items-center justify-center p-4 mb-12">
            <h1 class="text-5xl">
                Tic Tac Toe
            </h1>
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
                    <PlayerIcon
                        :value="game.currentPlayer.value"
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

        <LazyResultGameWon v-if="game.winner.value" />
        <LazyResultGameDraw v-else-if="game.isDraw.value" />
    </div>
</template>

<script lang="ts" setup>
import { GameProvideKey } from '~/utils/shared';

const game = useGame();

provide(GameProvideKey, game);

const handleCellClick = (rowIndex: number, colIndex: number): void => {
    game.makeMove(rowIndex, colIndex);
};

const handleResetGame = (): void => {
    game.resetGame();
};
</script>

<style></style>
