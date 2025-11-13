import type { CellValue, GameState } from '~/types/game.types';
import { checkWin } from '~/utils/checkWin';
import { initBoardMatrix } from '~/utils/shared';
import { isBoardFull } from '~/utils/board.utils';

/**
 * Composable for managing game state (winner, draw, game over)
 * Integrates with checkWin utility
 */
export const useGameState = (rows: number, cols: number): GameState => {
    const winner = ref<CellValue | null>(null);
    const resultData = ref<boolean[][]>(initBoardMatrix(rows, cols, false));
    const isGameOver = computed(() => winner.value !== null || isDraw.value);
    const isDraw = ref<boolean>(false);

    const setWinner = (player: CellValue, winningCells: boolean[][]): void => {
        winner.value = player;
        resultData.value = winningCells;
    };

    const setDraw = (): void => {
        isDraw.value = true;
    };

    const reset = (): void => {
        winner.value = null;
        resultData.value = initBoardMatrix(rows, cols, false);
        isDraw.value = false;
    };

    return {
        winner,
        resultData,
        isGameOver,
        isDraw,
        setWinner,
        setDraw,
        reset,
    };
};

/**
 * Check game status and update game state accordingly
 */
export const checkGameStatus = (
    gameState: GameState,
    board: CellValue[][],
    currentPlayer: CellValue,
    rows: number,
    cols: number,
): void => {
    // Check for win
    const winResult = checkWin(rows, cols, board, currentPlayer);

    if (winResult && winResult.won) {
        gameState.setWinner(currentPlayer, winResult.resultData);
        return;
    }

    // Check for draw
    if (isBoardFull(board)) {
        gameState.setDraw();
    }
};
