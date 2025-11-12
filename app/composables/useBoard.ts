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
}

export type CellValue = 'X' | 'O' | null;

export const useBoard = (params: UseBoardParams = { rows: 3, cols: 3 }): UseBoardType => {
    const currentPlayer = ref<CellValue>('O');
    const gameWonBy = ref<CellValue>(null);
    const rows = params.rows;
    const cols = params.cols;

    const init = (defaultValue: CellValue | boolean) => Array.from({ length: Number(rows) }, () =>
        Array(Number(cols)).fill(defaultValue as CellValue),
    );

    const data = ref<CellValue[][]>(init(null));
    // const resultData = ref<{ row: number; col: number }[] | null>(null);

    // boolean 2D matrix
    const resultData = ref<boolean[][]>(init(false));

    function updateCell(rowIndex: number, colIndex: number) {
        if (gameWonBy.value) {
            return;
        }

        if (data.value[rowIndex]) {
            if (data.value[rowIndex][colIndex]) {
                return;
            }

            data.value[rowIndex][colIndex] = currentPlayer.value as CellValue;
            const won = checkWin();

            if (won) {
                gameWonBy.value = currentPlayer.value;
                console.log(resultData.value);
            }
            else {
                currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWin() {
        resultData.value = init(false);
        console.log('%cRows Check', 'color:#00ff00;font-size:30px;font-weight:bold;');
        // check rows
        for (let row = 0; row < rows; row++) {
            const allRowsMatched = data.value[row]?.every((cell, colIndex) => {
                if (cell === currentPlayer.value) {
                    // resultData.value?.push({ row: row, col: colIndex });
                    (resultData.value[row] as boolean[])[colIndex] = true;

                    return true;
                }

                return false;
            });

            if (allRowsMatched) {
                return true;
            }
        }

        console.log('%cColumns Check', 'color:#00ff00;font-size:30px;font-weight:bold;');
        resultData.value = init(false);
        // check columns
        for (let col = 0; col < cols; col++) {
            const allColsMatched = data.value.every((row, rowIndex) => {
                if (row?.[col] === currentPlayer.value) {
                    // resultData.value?.push({ row: rowIndex, col: col });
                    (resultData.value[rowIndex] as boolean[])[col] = true;

                    return true;
                }

                return false;
            });

            if (allColsMatched) {
                return true;
            }
        }

        console.log('%c Diagonal Check', 'color:#00ff00;font-size:30px;font-weight:bold;');
        resultData.value = init(false);
        // check diagonal
        const diagonalMatch = data.value.every((row, rowIndex) => {
            if (row?.[rowIndex] === currentPlayer.value) {
                // resultData.value?.push({ row: rowIndex, col: rowIndex });
                (resultData.value[rowIndex] as boolean[])[rowIndex] = true;
                return true;
            }

            // const lastIndex = data.value.length - 1;
            // if (row?.[lastIndex - rowIndex] === currentPlayer.value) {
            //     // resultData.value?.push({ row: rowIndex, col: lastIndex - rowIndex });
            //     (resultData.value[rowIndex] as boolean[])[lastIndex - rowIndex] = true;

            //     return true;
            // }

            return false;
        });
        if (diagonalMatch) {
            return true;
        }

        console.log('%cdignoal check 2', 'color:#00ff00;font-size:30px;font-weight:bold;');
        const diagonalMatch2 = data.value.every((row, rowIndex) => {
            // if (row?.[rowIndex] === currentPlayer.value) {
            //     // resultData.value?.push({ row: rowIndex, col: rowIndex });
            //     (resultData.value[rowIndex] as boolean[])[rowIndex] = true;
            //     return true;
            // }

            const lastIndex = data.value.length - 1;
            if (row?.[lastIndex - rowIndex] === currentPlayer.value) {
                // resultData.value?.push({ row: rowIndex, col: lastIndex - rowIndex });
                (resultData.value[rowIndex] as boolean[])[lastIndex - rowIndex] = true;

                return true;
            }

            return false;
        });

        if (diagonalMatch2) {
            return true;
        }

        return false;
    }

    function resetGame() {
        data.value = init(null);
        resultData.value = init(false);
        gameWonBy.value = null;
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
    };
};
