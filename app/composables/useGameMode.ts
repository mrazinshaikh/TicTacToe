import type { GameMode } from '~/types/game.types';

/**
 * Composable for managing game mode (Player vs Player or Player vs Bot)
 */
export const useGameMode = (initialMode: GameMode = 'vsPlayer') => {
    const gameMode = ref<GameMode>(initialMode);

    const setGameMode = (mode: GameMode): void => {
        gameMode.value = mode;
    };

    const isVsBot = computed(() => gameMode.value === 'vsBot');
    const isVsPlayer = computed(() => gameMode.value === 'vsPlayer');

    return {
        gameMode: readonly(gameMode),
        setGameMode,
        isVsBot,
        isVsPlayer,
    };
};
