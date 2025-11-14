<template>
    <div class="mx-auto flex justify-center items-center">
        <div
            class="w-max grid justify-center border border-pancho-600"
            :class="[{ 'cursor-progress opacity-10 animate-pulse': isBoardLoading }]"
            :disabled="isBoardLoading"
            :style="{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }"
        >
            <template
                v-for="(row, rowIndex) in Array.from(Array(rows))"
                :key="`board_row_${rowIndex}`"
            >
                <template
                    v-for="(col, colIndex) in Array.from(Array(cols))"
                    :key="`board_column_${colIndex}`"
                >
                    <UCheckbox
                        :value="currentPlayer"
                        :disabled="
                            isBoardLoading || isLoading || board[rowIndex]?.[colIndex] !== null
                        "
                        :model-value="board[rowIndex]?.[colIndex] !== null"
                        :ui="{
                            base: 'hidden!',
                            wrapper: 'ms-0',
                        }"
                        @update:model-value="() => handleCellClick(rowIndex, colIndex)"
                    >
                        <template #label>
                            <div
                                class="size-24 border border-pancho-600"
                                :class="[{ 'pointer-events-none': isBoardLoading }]"
                            >
                                <PlayerIcon
                                    v-if="board[rowIndex]?.[colIndex]"
                                    :value="board[rowIndex]?.[colIndex]"
                                    :class="`w-full h-full ${
                                        winningCells[rowIndex]?.[colIndex]
                                            ? 'zoom-scale-animation'
                                            : ''
                                    }`"
                                />
                            </div>
                        </template>
                    </UCheckbox>
                </template>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { CellValue } from '~/types/game.types';

defineProps<{
    board: CellValue[][];
    currentPlayer: CellValue;
    winningCells: boolean[][];
    isLoading: boolean;
    isBoardLoading: boolean;
    rows: number;
    cols: number;
}>();

const emit = defineEmits<{
    (event: 'cell-clicked', rowIndex: number, colIndex: number): void;
}>();

const handleCellClick = (rowIndex: number, colIndex: number): void => {
    emit('cell-clicked', rowIndex, colIndex);
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
