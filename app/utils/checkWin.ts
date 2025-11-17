import type { CellValue } from '~/types/game.types';

export interface WinLine {
    type: 'row' | 'col' | 'diag' | 'anti-diag' | null;
    index: number;
}
export interface WinResponse extends WinLine {
    resultMatrix: boolean[][];
}

export function checkWin(
    rows: number,
    cols: number,
    data: CellValue[][],
    currentPlayer: CellValue,
): false | WinResponse {
    // Check rows
    for (let row = 0; row < rows; row++) {
        let matchCount = 0;
        for (let col = 0; col < cols; col++) {
            if (data[row]?.[col] === currentPlayer) {
                matchCount++;
            }
            else {
                break;
            }
        }

        if (matchCount === cols) {
            const resultData = initBoardMatrix(rows, cols, false);
            for (let col = 0; col < cols; col++) {
                resultData[row]![col] = true;
            }
            return { resultMatrix: resultData, type: 'row', index: row };
        }
    }

    // Check columns
    for (let col = 0; col < cols; col++) {
        let matchCount = 0;
        for (let row = 0; row < rows; row++) {
            if (data[row]?.[col] === currentPlayer) {
                matchCount++;
            }
            else {
                break;
            }
        }

        if (matchCount === rows) {
            const resultData = initBoardMatrix(rows, cols, false);
            for (let row = 0; row < rows; row++) {
                resultData[row]![col] = true;
            }
            return { resultMatrix: resultData, type: 'col', index: col };
        }
    }

    // Check main diagonal
    let matchCount = 0;
    for (let i = 0; i < rows; i++) {
        if (data[i]?.[i] === currentPlayer) {
            matchCount++;
        }
        else {
            break;
        }
    }

    if (matchCount === rows) {
        const resultData = initBoardMatrix(rows, cols, false);
        for (let i = 0; i < rows; i++) {
            resultData[i]![i] = true;
        }
        return { resultMatrix: resultData, type: 'diag', index: 0 };
    }

    // Check anti-diagonal
    matchCount = 0;
    for (let i = 0; i < rows; i++) {
        if (data[i]?.[rows - 1 - i] === currentPlayer) {
            matchCount++;
        }
        else {
            break;
        }
    }

    if (matchCount === rows) {
        const resultData = initBoardMatrix(rows, cols, false);
        for (let i = 0; i < rows; i++) {
            resultData[i]![rows - 1 - i] = true;
        }
        return { resultMatrix: resultData, type: 'anti-diag', index: 0 };
    }

    return false;
}
