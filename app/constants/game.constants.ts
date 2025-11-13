import type { Player } from '~/types/game.types';

/**
 * Player symbols
 */
export const PLAYER_X: Player = 'X';
export const PLAYER_O: Player = 'O';

/**
 * Default board dimensions
 */
export const DEFAULT_BOARD_ROWS = 3;
export const DEFAULT_BOARD_COLS = 3;

/**
 * Default starting player
 */
export const DEFAULT_STARTING_PLAYER: Player = PLAYER_O;

/**
 * Animation constants
 */
export const WINNING_ANIMATION_DURATION = 0.5; // seconds
export const WINNING_ANIMATION_ITERATIONS = 3;
export const WINNING_ANIMATION_SCALE = 1.5;

/**
 * Empty cell value
 */
export const EMPTY_CELL = null;
