import type { Ref } from 'vue';

export interface UseBoardParams {
    rows: number;
    cols: number;
}

export interface UseBoardType {
    rows: number;
    cols: number;
    currentPlayer: Ref<CellValue>;
    data: Ref<CellValue[][]>;
    updateCell: (rowIndex: number, colIndex: number) => void;
    gameWonBy: Ref<CellValue | null>;
    resultData: Ref<boolean[][]>;
    resetGame: () => void;
    isLoading: Ref<boolean>;
    isBoardLoading: Ref<boolean>;
}

export type CellValue = 'X' | 'O' | null;

export const useBoard = (params: UseBoardParams = { rows: 3, cols: 3 }): UseBoardType => {
    const isBoardLoading = ref(true);
    const isLoading = ref(false);
    const currentPlayer = ref<CellValue>('O');
    const gameWonBy = ref<CellValue>(null);
    const rows = params.rows;
    const cols = params.cols;

    const init = (defaultValue: CellValue | boolean) => initBoardMatrix(rows, cols, defaultValue);

    const data = ref<CellValue[][]>(init(null));

    // boolean 2D matrix
    const resultData = ref<boolean[][]>(init(false));

    onMounted(() => {
        isBoardLoading.value = false;
    });

    function updateCell(rowIndex: number, colIndex: number) {
        if (gameWonBy.value) {
            return;
        }
        isLoading.value = true;

        if (data.value[rowIndex]) {
            if (data.value[rowIndex][colIndex]) {
                isLoading.value = false;
                return;
            }

            data.value[rowIndex][colIndex] = currentPlayer.value as CellValue;
            // const start = performance.now();
            console.time('checkWin');
            const gameWinResponse = checkWin(rows, cols, data.value, currentPlayer.value);
            // const end = performance.now();
            console.timeEnd('checkWin');

            if (gameWinResponse && gameWinResponse.won) {
                gameWonBy.value = currentPlayer.value;
                resultData.value = gameWinResponse.resultData;
            }
            else {
                currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
            }
        }
        isLoading.value = false;
    }

    function resetGame() {
        data.value = init(null);
        resultData.value = init(false);
        gameWonBy.value = null;
        isLoading.value = false;
        isBoardLoading.value = false;
    }

    return {
        rows,
        cols,
        currentPlayer,
        data,
        updateCell,
        gameWonBy,
        resultData,
        resetGame,
        isLoading,
        isBoardLoading,
    };
};
