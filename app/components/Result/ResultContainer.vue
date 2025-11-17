<template>
    <div class="relative">
        <div
            class="fixed inset-0 h-screen w-screen overflow-hidden z-50 bg-gray-500/60"
            :class="$attrs.class"
        >
            <div class="absolute top-0 ring-0 w-full flex items-center justify-end">
                <UButton
                    size="xl"
                    variant="ghost"
                    icon="i-lucide-x"
                    class="hover:bg-transparent! cursor-pointer text-white"
                    @click="emit('close')"
                />
            </div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>
