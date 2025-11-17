import type { CellValue, GameState, Player } from '~/types/game.types';
import { checkWin, type WinResponse } from '~/utils/checkWin';
import { initBoardMatrix } from '~/utils/shared';
import { isBoardFull } from '~/utils/board.utils';

/**
 * Composable for managing game state (winner, draw, game over)
 * Integrates with checkWin utility
 */
export const useGameState = (rows: number, cols: number): GameState => {
    const isResultOpen = ref<boolean>(true);
    const winner = ref<CellValue | null>(null);
    const resultData = ref<WinResponse>({
        resultMatrix: initBoardMatrix(rows, cols, false),
        type: null,
        index: 0,
    });
    const isGameOver = computed(() => winner.value !== null || isDraw.value);
    const isDraw = ref<boolean>(false);

    const gameScore = useGameScoreStore();

    const setWinner = (player: CellValue, winResult: WinResponse): void => {
        isResultOpen.value = true;
        winner.value = player;
        resultData.value = {
            ...resultData.value,
            resultMatrix: winResult.resultMatrix,
            type: winResult.type,
            index: winResult.index,
        };

        gameScore.updateScore(player?.toUpperCase() as Player);
    };

    const setDraw = (): void => {
        isResultOpen.value = true;
        isDraw.value = true;
    };

    const reset = (): void => {
        winner.value = null;
        resultData.value = {
            resultMatrix: initBoardMatrix(rows, cols, false),
            type: 'row',
            index: 0,
        };
        isDraw.value = false;
        isResultOpen.value = false;
    };

    const closeResult = (): void => {
        isResultOpen.value = false;
    };

    return {
        isResultOpen,
        winner,
        resultData,
        isGameOver,
        isDraw,
        setWinner,
        setDraw,
        reset,
        closeResult,
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

    if (winResult && winResult.resultMatrix) {
        gameState.setWinner(currentPlayer, winResult);
        return;
    }

    // Check for draw
    if (isBoardFull(board)) {
        gameState.setDraw();
    }
};
