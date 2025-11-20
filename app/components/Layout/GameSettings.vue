<template>
    <UPopover
        modal
        dismissible
        arrow
    >
        <UButton
            name="Settings"
            aria-label="Settings"
            icon="lucide:settings"
            color="neutral"
            variant="ghost"
        />

        <template #content="{ close }">
            <div class="w-48 p-4">
                <UTooltip
                    text="Reset stored scores and restart the game."
                    ignore-non-keyboard-focus
                >
                    <UButton
                        color="error"
                        icon="lucide:rotate-ccw"
                        class="w-full bg-red-500 text-white"
                        label="Reset Scores"
                        @click.prevent="() => requestConfirm('resetScores')"
                    />
                </UTooltip>

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
                                    :style="{
                                        '--n': form.size || 3,
                                        'grid-template-columns': `repeat(${form.size || 3},1fr)`,
                                    }"
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
                            icon="lucide:save"
                            class="w-full bg-pancho-500"
                            label="Save"
                            @click.prevent="() => requestConfirm('saveConfig', close)"
                        />
                    </div>
                    <div>
                        <UTooltip text="Rest game config and restart the game.">
                            <UButton
                                variant="outline"
                                icon="lucide:list-restart"
                                class="w-full text-pancho-700"
                                label="Reset to default"
                                @click.prevent="() => requestConfirm('resetConfig', close)"
                            />
                        </UTooltip>
                    </div>
                </form>
            </div>
        </template>
    </UPopover>

    <ConfirmModal
        v-model:open="confirmModal.open"
        :message="confirmModal.message"
        @confirm="confirmAction"
        @cancel="cancelConfirm"
    />
</template>

<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import { getDefaultGameConfig } from '~/config/game.config';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { Player } from '~/types/game.types';

const ConfirmModal = defineAsyncComponent(() => import('~/components/ConfirmModal.vue'));

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

type ConfirmAction = 'resetScores' | 'saveConfig' | 'resetConfig';

interface ConfirmState {
    open: boolean;
    message: string;
}

const confirmModal = reactive<ConfirmState>({
    open: false,
    message: '',
});

const pendingAction = ref<(() => void) | null>(null);
const confirmOptions: Record<
    ConfirmAction,
    {
        message: string;
        getHandler: (close?: () => void) => () => void;
    }
> = {
    resetScores: {
        message: 'Reset stored scores and restart the current game?',
        getHandler: () => executeScoreReset,
    },
    saveConfig: {
        message: 'Save settings and restart the current game?',
        getHandler: close => () => executeSave(close),
    },
    resetConfig: {
        message: 'Restore default configuration and restart the current game?',
        getHandler: close => () => executeConfigReset(close),
    },
};

const players: RadioGroupItem[] = [
    { label: PLAYER_O, value: PLAYER_O },
    { label: PLAYER_X, value: PLAYER_X },
];

function executeSave(close?: () => void) {
    game.updateGameConfig({
        rows: form.value.size,
        cols: form.value.size,
        defaultPlayer: form.value.defaultPlayer,
    });
    game.resetGame();
    close?.();
}

function executeConfigReset(close?: () => void) {
    const config = getDefaultGameConfig();
    game.updateGameConfig(config);
    game.resetGame();

    form.value.size = config.rows;
    form.value.defaultPlayer = config.defaultPlayer;
    close?.();
}

function executeScoreReset() {
    game.resetGame();
    gameScore.reset();
}

function requestConfirm(action: ConfirmAction, close?: () => void) {
    const option = confirmOptions[action];

    confirmModal.message = option.message;
    confirmModal.open = true;
    pendingAction.value = () => {
        option.getHandler(close)();
        confirmModal.open = false;
        pendingAction.value = null;
    };
}

function confirmAction() {
    pendingAction.value?.();
}

function cancelConfirm() {
    confirmModal.open = false;
    pendingAction.value = null;
}
</script>
