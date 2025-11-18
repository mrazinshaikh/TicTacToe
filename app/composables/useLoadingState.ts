import type { LoadingState } from '~/types/game.types';

/**
 * Composable for managing loading states
 * Can be reused across different parts of the application
 */
export const useLoadingState = (): LoadingState => {
    const isLoading = ref<boolean>(false);
    const isBoardLoading = ref<boolean>(true);

    const startLoading = (): void => {
        isLoading.value = true;
    };

    const stopLoading = (): void => {
        isLoading.value = false;
    };

    const setLoading = (value: boolean): void => {
        isLoading.value = value;
    };

    const setBoardLoading = (value: boolean): void => {
        isBoardLoading.value = value;
    };

    return {
        isLoading,
        isBoardLoading,
        startLoading,
        stopLoading,
        setLoading,
        setBoardLoading,
    };
};
