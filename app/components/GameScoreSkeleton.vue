<template>
    <div class="flex items-center justify-center p-4 mb-2">
        <div class="flex w-sm gap-4">
            <div class="score-block-skeleton">
                <div class="h-4 w-20 bg-pancho-300 rounded animate-pulse" />
                <div class="h-6 w-8 bg-pancho-300 rounded animate-pulse" />
            </div>
            <div class="score-block-skeleton">
                <div class="h-4 w-20 bg-pancho-300 rounded animate-pulse" />
                <div class="h-6 w-8 bg-pancho-300 rounded animate-pulse" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../assets/css/main.css";

.score-block-skeleton {
    @apply flex flex-1 items-center justify-between rounded border border-pancho-400 px-3;
}
</style>
