import type { Ref } from 'vue';

/**
 * Represents a cell value on the game board
 */
export type CellValue = 'X' | 'O' | null;

/**
 * Represents a player in the game
 */
export type Player = 'X' | 'O';

/**
 * Game configuration interface
 */
export interface GameConfig {
    rows: number;
    cols: number;
    defaultPlayer: Player;
}

/**
 * Board state interface
 */
export interface BoardState {
    data: Ref<CellValue[][]>;
    rows: number;
    cols: number;
}

/**
 * Player manager interface
 */
export interface PlayerManager {
    currentPlayer: Ref<CellValue>;
    switchPlayer: () => void;
    resetPlayer: () => void;
}

/**
 * Game state interface
 */
export interface GameState {
    isResultOpen: Ref<boolean>;
    winner: Ref<CellValue | null>;
    resultData: Ref<boolean[][]>;
    isGameOver: Ref<boolean>;
    isDraw: Ref<boolean>;
    setWinner: (player: CellValue, winningCells: boolean[][]) => void;
    setDraw: () => void;
    reset: () => void;
    closeResult: () => void;
}

/**
 * Loading state interface
 */
export interface LoadingState {
    isLoading: Ref<boolean>;
    isBoardLoading: Ref<boolean>;
    startLoading: () => void;
    stopLoading: () => void;
    setLoading: (value: boolean) => void;
    setBoardLoading: (value: boolean) => void;
}

/**
 * Complete game interface exposed by useGame
 */
export interface UseGameReturn {
    // Board state
    board: Ref<CellValue[][]>;
    rows: number;
    cols: number;

    // Player state
    currentPlayer: Ref<CellValue>;

    // Game state
    winner: Ref<CellValue | null>;
    resultData: Ref<boolean[][]>;
    isGameOver: Ref<boolean>;
    isDraw: Ref<boolean>;

    // Loading state
    isLoading: Ref<boolean>;
    isBoardLoading: Ref<boolean>;

    // Actions
    makeMove: (rowIndex: number, colIndex: number) => void;
    resetGame: () => void;
}

/**
 * Props for GameBoard component
 */
export interface GameBoardProps {
    board: CellValue[][];
    currentPlayer: CellValue;
    winningCells: boolean[][];
    isLoading: boolean;
    isBoardLoading: boolean;
    rows: number;
    cols: number;
}

/**
 * Emits for GameBoard component
 */
export interface GameBoardEmits {
    (event: 'cell-clicked', rowIndex: number, colIndex: number): void;
}

/**
 * Props for GameCell component
 */
export interface GameCellProps {
    value: CellValue;
    isWinning: boolean;
    isDisabled: boolean;
}

/**
 * Emits for GameCell component
 */
export interface GameCellEmits {
    (event: 'click'): void;
}
