export interface UseGameType {
    board: UseBoardType;
}

export const useGame = (): UseGameType => {
    const board = useBoard();

    return {
        board,
    };
};
