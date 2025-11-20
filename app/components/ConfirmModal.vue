<template>
    <UModal
        v-model:open="openState"
        title="Confirm Action"
        :ui="{ footer: 'justify-end gap-2' }"
        modal
        dismissible
        aria-describedby="confirm modal"
    >
        <template #body>
            <p class="text-sm text-gray-500">
                {{ props.message }}
            </p>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="ghost"
                label="Cancel"
                @click="handleCancel"
            />
            <UButton
                label="Confirm"
                @click="handleConfirm"
            />
        </template>
    </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{
    message: string;
}>();

const emit = defineEmits<{
    (e: 'confirm' | 'cancel'): void;
}>();

const openState = defineModel<boolean>('open');

function handleConfirm() {
    emit('confirm');
    openState.value = false;
}

function handleCancel() {
    emit('cancel');
    openState.value = false;
}
</script>
