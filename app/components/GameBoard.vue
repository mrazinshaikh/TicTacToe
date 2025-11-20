<template>
    <div class="flex justify-center items-center">
        <div
            class="relative grid justify-center"
            :class="[{ 'cursor-progress opacity-10 animate-pulse': game.isBoardLoading }]"
            :disabled="game.isBoardLoading"
            :style="{
                gridTemplateColumns: `repeat(${game.cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${game.rows}, minmax(0, 1fr))`,
            }"
        >
            <template
                v-for="(row, rowIndex) in Array.from(Array(game.rows))"
                :key="`board_row_${rowIndex}`"
            >
                <template
                    v-for="(col, colIndex) in Array.from(Array(game.cols))"
                    :key="`board_column_${colIndex}`"
                >
                    <UCheckbox
                        :value="game.currentPlayer"
                        :disabled="
                            game.isBoardLoading
                                || game.isLoading
                                || game.board[rowIndex]?.[colIndex] !== null
                        "
                        :model-value="game.board[rowIndex]?.[colIndex] !== null"
                        :ui="{
                            base: 'hidden!',
                            wrapper: 'ms-0',
                        }"
                        @update:model-value="() => handleCellClick(rowIndex, colIndex)"
                    >
                        <template #label>
                            <!-- :class="[
                                'relative size-24 group',
                                rowIndex < rows - 1 ? 'border-b-2 border-pancho-600' : '',
                                colIndex < cols - 1 ? 'border-r-2 border-pancho-600' : '',
                                { 'pointer-events-none': isBoardLoading },
                            ]" -->
                            <div
                                class="relative border border-pancho-600 group"
                                :class="[
                                    { 'pointer-events-none': game.isBoardLoading },
                                    { 'size-22 md:size-24': game.rows === 3 },
                                    { 'size-18 sm:size-20 md:size-24 lg:size-24': game.rows === 4 },
                                    { 'size-14 sm:size-16 md:size-20 lg:size-24': game.rows === 5 },
                                ]"
                            >
                                <PlayerIcon
                                    v-if="game.board[rowIndex]?.[colIndex]"
                                    :value="game.board[rowIndex]?.[colIndex]"
                                    :class="`w-full h-full ${
                                        game.resultData.resultMatrix[rowIndex]?.[colIndex]
                                            ? 'zoom-scale-animation'
                                            : ''
                                    }`"
                                />
                                <PlayerIcon
                                    v-else
                                    :value="game.currentPlayer"
                                    :class="'absolute hidden indent-0 w-full h-full pointer-events-none opacity-20 group-hover:block'"
                                />

                                <div
                                    v-show="game.resultData.resultMatrix[rowIndex]?.[colIndex]"
                                    class="absolute inset-0 flex items-center justify-center overflow-hidden zoom-scale-animation"
                                >
                                    <div
                                        class="w-full h-1 bg-pancho-500"
                                        :class="[
                                            { 'rotate-90': game.resultData.type === 'col' },
                                            {
                                                'rotate-45 scale-150':
                                                    game.resultData.type === 'diag',
                                            },
                                            {
                                                '-rotate-45 scale-150':
                                                    game.resultData.type === 'anti-diag',
                                            },
                                        ]"
                                    />
                                </div>
                            </div>
                        </template>
                    </UCheckbox>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
const game = useGameStore();

const handleCellClick = (rowIndex: number, colIndex: number): void => {
    game.makeMove(rowIndex, colIndex);
};
</script>

<style>
@keyframes zoomScale {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.2);
    }
}

.zoom-scale-animation {
    animation-name: zoomScale;
    animation-iteration-count: 3;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
}
</style>
