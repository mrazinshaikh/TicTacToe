import type { CellValue, Player } from '~/types/game.types';
import { PLAYER_X, PLAYER_O } from '~/constants/game.constants';

/**
 * Get the next player in turn
 */
export const getNextPlayer = (currentPlayer: CellValue): Player => {
    return currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
};

/**
 * Get player symbol
 */
export const getPlayerSymbol = (player: Player): string => {
    return player;
};

/**
 * Validate if a value is a valid player
 */
export const isValidPlayer = (value: unknown): value is Player => {
    return value === PLAYER_X || value === PLAYER_O;
};

/**
 * Check if a cell value is a player (not null)
 */
export const isCellOccupied = (cellValue: CellValue): cellValue is Player => {
    return cellValue !== null;
};
