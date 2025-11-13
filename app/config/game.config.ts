import type { GameConfig } from '~/types/game.types';
import {
    DEFAULT_BOARD_ROWS,
    DEFAULT_BOARD_COLS,
    DEFAULT_STARTING_PLAYER,
} from '~/constants/game.constants';

/**
 * Game configuration
 * Modify these values to change the game behavior
 */
export const gameConfig: GameConfig = {
    rows: DEFAULT_BOARD_ROWS,
    cols: DEFAULT_BOARD_COLS,
    defaultPlayer: DEFAULT_STARTING_PLAYER,
};

/**
 * Get the current game configuration
 */
export const getGameConfig = (): GameConfig => {
    return { ...gameConfig };
};

/**
 * Update game configuration (useful for different game modes)
 */
export const updateGameConfig = (config: Partial<GameConfig>): void => {
    Object.assign(gameConfig, config);
};
