<template>
    <UPopover
        modal
        dismissible
        arrow
    >
        <UButton
            icon="i-lucide-settings"
            color="neutral"
            variant="ghost"
        />

        <template #content="{ close }">
            <div class="w-48 p-4">
                <UButton
                    color="error"
                    icon="i-lucide-rotate-ccw"
                    class="w-full bg-red-500 text-white"
                    label="Reset"
                    @click.prevent="() => handleReset()"
                />

                <form class="mt-3 space-y-3">
                    <div>
                        <label class="text-sm">Grid Size</label>
                        <div class="flex gap-3 items-center justify-center">
                            <UInputNumber
                                v-model="form.size"
                                :min="3"
                                :max="5"
                                placeholder=""
                                :ui="{ base: 'peer' }"
                            />
                            <!-- <span class="flex items-center min-w-6"> x {{ form.size || 0 }}</span> -->
                            <div>
                                <div
                                    class="grid border border-gray-700 size-8"
                                    :style="{ '--n': form.size || 3, 'grid-template-columns': `repeat(${form.size || 3},1fr)` }"
                                >
                                    <div
                                        v-for="i in (form.size || 3) * (form.size || 3)"
                                        :key="`grid-mock-${i}`"
                                        class="border border-gray-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="text-sm">Starting Player</label>
                        <URadioGroup
                            v-model="form.defaultPlayer"
                            indicator="end"
                            variant="card"
                            :default-value="PLAYER_O"
                            :items="players"
                            orientation="horizontal"
                        />
                    </div>
                    <div>
                        <UButton
                            icon="i-lucide-save"
                            class="w-full bg-pancho-500"
                            label="Save"
                            @click.prevent="() => handleSave(close)"
                        />
                    </div>
                </form>
            </div>
        </template>
    </UPopover>
</template>

<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { Player } from '~/types/game.types';

const game = useGameStore();
const gameScore = useGameScoreStore();

interface Form {
    size: number;
    defaultPlayer: Player;
}
const form = ref<Form>({
    size: game.rows,
    defaultPlayer: game.defaultPlayer ?? PLAYER_O,
});

const players: RadioGroupItem[] = [
    { label: PLAYER_O, value: PLAYER_O },
    { label: PLAYER_X, value: PLAYER_X },
];

function handleSave(close: () => void) {
    if (!confirm('This action will reset the current game and update the game configuration. Are you sure?')) {
        return;
    }

    game.updateGameConfig({
        rows: form.value.size,
        cols: form.value.size,
        defaultPlayer: form.value.defaultPlayer,
    });
    game.resetGame();
    close();
}

function handleReset() {
    if (!confirm('This action will reset all scores and the current game state. Are you sure?')) {
        return;
    }
    game.resetGame();
    gameScore.reset();
}
</script>
