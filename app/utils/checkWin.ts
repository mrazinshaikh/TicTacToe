export interface CheckWinResponse {
    won: boolean;
    resultData: boolean[][];
}

export function gameWonResponse(value: boolean, resultData: boolean[][]): CheckWinResponse {
    return {
        won: value,
        resultData: resultData,
    };
}
export function checkWin(
    rows: number,
    cols: number,
    data: CellValue[][],
    currentPlayer: CellValue,
): false | CheckWinResponse {
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
            return { won: true, resultData };
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
            return { won: true, resultData };
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
        return { won: true, resultData };
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
        return { won: true, resultData };
    }

    return false;
}
