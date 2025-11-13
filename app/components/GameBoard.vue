<template>
    <div class="mx-auto flex justify-center items-center">
        <div
            class="w-max grid justify-center border border-pancho-600"
            :class="[{ 'cursor-progress opacity-10 animate-pulse': isBoardLoading }]"
            :disabled="isBoardLoading"
            :style="{
                gridTemplateColumns: `repeat(${rows}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${cols}, minmax(0, 1fr))`,
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
                    <!-- <div class="size-24 border border-pancho-600">
                    Row: {{ row }} <br/>
                    Col: {{ col }} <br/>
                </div> -->
                    <UCheckbox
                        :value="currentPlayer"
                        :disabled="isBoardLoading || data[rowIndex]?.[colIndex] !== null"
                        :model-value="data[rowIndex]?.[colIndex] !== null"
                        :ui="{ base: 'hidden!', wrapper: 'ms-0' }"
                        @update:model-value="() => updateCell(rowIndex, colIndex)"
                    >
                        <template #label>
                            <div
                                class="size-24 border border-pancho-600"
                                :class="[{ 'pointer-events-none': isBoardLoading }]"
                            >
                                <PlayerIcon
                                    v-if="data[rowIndex]?.[colIndex]"
                                    :value="data[rowIndex]?.[colIndex]"
                                    :class="`w-full h-full ${
                                        gameWonBy && resultData[rowIndex]?.[colIndex]
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
const props = defineProps<{
    board: UseBoardType;
}>();

const { data, currentPlayer, updateCell, gameWonBy, resultData } = props.board;

const { rows, cols, isBoardLoading } = props.board;
</script>

<style>
@keyframes zoomScale {
    from {
        transform: scale(1);
    }
    to {
        transform: scale(1.5);
    }
}

.zoom-scale-animation {
    animation-name: zoomScale;
    animation-iteration-count: 3;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
}
</style>
