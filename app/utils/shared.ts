export const GameProvideKey = Symbol() as InjectionKey<UseGameType>;

export function initBoardMatrix<T extends CellValue | boolean>(rows: number, cols: number, defaultValue: T): T extends boolean ? boolean[][] : CellValue[][] {
    return Array.from({ length: Number(rows) }, () =>
        Array(Number(cols)).fill(defaultValue),
    );
}
