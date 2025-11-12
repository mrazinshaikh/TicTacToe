<template>
    <UIcon
        v-if="iconName"
        :name="iconName"
        class="size-5"
    />
</template>

<script lang="ts" setup>
const props = defineProps<{
    value?: CellValue;
}>();

const game = inject(GameProvideKey);
const currentPlayer = computed(() => game?.board.currentPlayer.value);

const iconName = computed(() => {
    const value = props.value ?? currentPlayer?.value;

    if (value === 'X') {
        return 'i-lucide-x';
    }
    else if (value === 'O') {
        return 'i-lucide-circle';
    }

    return null;
});
</script>
