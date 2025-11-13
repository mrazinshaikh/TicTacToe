import type { CellValue, Player, PlayerManager } from '~/types/game.types';
import { getNextPlayer } from '~/utils/player.utils';

/**
 * Composable for managing player turns
 * Independent of board state
 */
export const usePlayerManager = (initialPlayer: Player): PlayerManager => {
    const currentPlayer = ref<CellValue>(initialPlayer);
    const defaultPlayer = initialPlayer;

    const switchPlayer = (): void => {
        currentPlayer.value = getNextPlayer(currentPlayer.value);
    };

    const resetPlayer = (): void => {
        currentPlayer.value = defaultPlayer;
    };

    return {
        currentPlayer,
        switchPlayer,
        resetPlayer,
    };
};
