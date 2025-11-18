<template>
    <div class="flex justify-center items-center">
        <div
            class="relative grid justify-center gap-0"
            :style="{
                gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(3, minmax(0, 1fr))`,
            }"
        >
            <div
                v-for="i in 9"
                :key="i"
                class="border border-pancho-600 size-24 bg-pancho-200 animate-pulse"
            />
        </div>
    </div>
</template>
