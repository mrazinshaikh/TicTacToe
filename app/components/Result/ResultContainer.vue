<template>
    <div class="fixed inset-0 h-screen w-svw overflow-hidden z-50 bg-gray-500/60">
        <div class="w-full flex items-center justify-end pr-0 md:pr-4">
            <UButton
                size="xl"
                variant="ghost"
                icon="i-lucide-x"
                class="hover:bg-transparent! cursor-pointer text-white"
                @click="game.closeResult()"
            />
        </div>

        <div :class="$attrs.class">
            <slot />
        </div>

        <div class="mt-16 w-full flex items-center justify-center gap-3">
            <GameRestButton />
            <UButton
                variant="outline"
                color="neutral"
                icon="i-lucide-x"
                label="Close"
                @click="game.closeResult()"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const game = useGameStore();

defineOptions({
    inheritAttrs: false,
});
</script>
