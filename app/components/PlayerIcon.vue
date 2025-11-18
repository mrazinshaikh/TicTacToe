<template>
    <UIcon
        v-if="iconName"
        :name="iconName"
        class="size-5"
    />
</template>

<script lang="ts" setup>
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { CellValue } from '~/types/game.types';

const props = defineProps<{
    value?: CellValue;
}>();

const game = useGameStore();
const currentPlayer = computed(() => game?.winner);

const iconName = computed(() => {
    const value = props.value ?? currentPlayer?.value;

    if (value === PLAYER_X) {
        return 'lucide:x';
    }
    else if (value === PLAYER_O) {
        return 'lucide:circle';
    }

    return null;
});
</script>
