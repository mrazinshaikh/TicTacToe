import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { EMPTY_CELL, PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check useGameStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('check initial state', () => {
        const gameStore = useGameStore();

        expect(gameStore.config).toStrictEqual({
            rows: 3,
            cols: 3,
            defaultPlayer: PLAYER_O,
        });

        expect(gameStore.board).toStrictEqual([
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ]);

        expect(gameStore.currentPlayer).toBe(PLAYER_O);
        expect(gameStore.winner).toBe(null);
        expect(gameStore.isDraw).toBe(false);
        expect(gameStore.isResultOpen).toBe(false);
        expect(gameStore.isGameOver).toBe(false);
        expect(gameStore.isFreshBoard).toBe(true);
    });

    it('check computed properties', () => {
        const gameStore = useGameStore();

        expect(gameStore.rows).toBe(3);
        expect(gameStore.cols).toBe(3);
        expect(gameStore.defaultPlayer).toBe(PLAYER_O);
        expect(gameStore.isGameOver).toBe(false);
    });

    it('check makeMove on empty cell', () => {
        const gameStore = useGameStore();

        gameStore.makeMove(0, 0);

        expect(gameStore.board[0]![0]).toBe(PLAYER_O);
        expect(gameStore.currentPlayer).toBe(PLAYER_X);
        expect(gameStore.isFreshBoard).toBe(false);
    });

    it('check makeMove on occupied cell', () => {
        const gameStore = useGameStore();

        gameStore.makeMove(0, 0);
        expect(gameStore.board[0]![0]).toBe(PLAYER_O);

        gameStore.makeMove(0, 0);
        expect(gameStore.board[0]![0]).toBe(PLAYER_O);
        expect(gameStore.currentPlayer).toBe(PLAYER_X);
    });

    it('check player switching', () => {
        const gameStore = useGameStore();

        expect(gameStore.currentPlayer).toBe(PLAYER_O);

        gameStore.makeMove(0, 0);
        expect(gameStore.currentPlayer).toBe(PLAYER_X);

        gameStore.makeMove(0, 1);
        expect(gameStore.currentPlayer).toBe(PLAYER_O);

        gameStore.makeMove(0, 2);
        expect(gameStore.currentPlayer).toBe(PLAYER_X);
    });

    it('check row win', () => {
        const gameStore = useGameStore();

        // O wins row 0
        gameStore.makeMove(0, 0); // O
        gameStore.makeMove(1, 0); // X
        gameStore.makeMove(0, 1); // O
        gameStore.makeMove(1, 1); // X
        gameStore.makeMove(0, 2); // O wins

        expect(gameStore.winner).toBe(PLAYER_O);
        expect(gameStore.isGameOver).toBe(true);
        expect(gameStore.isResultOpen).toBe(true);
        expect(gameStore.resultData.type).toBe('row');
        expect(gameStore.resultData.index).toBe(0);
    });

    it('check column win', () => {
        const gameStore = useGameStore();

        // O wins col 0
        gameStore.makeMove(0, 0); // O
        gameStore.makeMove(0, 1); // X
        gameStore.makeMove(1, 0); // O
        gameStore.makeMove(1, 1); // X
        gameStore.makeMove(2, 0); // O wins

        expect(gameStore.winner).toBe(PLAYER_O);
        expect(gameStore.isGameOver).toBe(true);
        expect(gameStore.isResultOpen).toBe(true);
        expect(gameStore.resultData.type).toBe('col');
        expect(gameStore.resultData.index).toBe(0);
    });

    it('check diagonal win', () => {
        const gameStore = useGameStore();

        // O wins diagonal
        gameStore.makeMove(0, 0); // O
        gameStore.makeMove(0, 1); // X
        gameStore.makeMove(1, 1); // O
        gameStore.makeMove(0, 2); // X
        gameStore.makeMove(2, 2); // O wins

        expect(gameStore.winner).toBe(PLAYER_O);
        expect(gameStore.isGameOver).toBe(true);
        expect(gameStore.isResultOpen).toBe(true);
        expect(gameStore.resultData.type).toBe('diag');
    });

    it('check anti-diagonal win', () => {
        const gameStore = useGameStore();

        // O wins anti-diagonal
        gameStore.makeMove(0, 2); // O
        gameStore.makeMove(0, 0); // X
        gameStore.makeMove(1, 1); // O
        gameStore.makeMove(0, 1); // X
        gameStore.makeMove(2, 0); // O wins

        expect(gameStore.winner).toBe(PLAYER_O);
        expect(gameStore.isGameOver).toBe(true);
        expect(gameStore.isResultOpen).toBe(true);
        expect(gameStore.resultData.type).toBe('anti-diag');
    });

    it('check draw game', () => {
        const gameStore = useGameStore();

        // O X O
        // O X X
        // X O O
        gameStore.makeMove(0, 0); // O
        gameStore.makeMove(0, 1); // X
        gameStore.makeMove(0, 2); // O
        gameStore.makeMove(1, 1); // X
        gameStore.makeMove(2, 1); // O
        gameStore.makeMove(1, 2); // X
        gameStore.makeMove(1, 0); // O
        gameStore.makeMove(2, 0); // X
        gameStore.makeMove(2, 2); // O - draw

        expect(gameStore.winner).toBe(null);
        expect(gameStore.isDraw).toBe(true);
        expect(gameStore.isGameOver).toBe(true);
        expect(gameStore.isResultOpen).toBe(true);
    });

    it('check no moves after game over', () => {
        const gameStore = useGameStore();

        // O wins
        gameStore.makeMove(0, 0); // O
        gameStore.makeMove(1, 0); // X
        gameStore.makeMove(0, 1); // O
        gameStore.makeMove(1, 1); // X
        gameStore.makeMove(0, 2); // O wins

        expect(gameStore.isGameOver).toBe(true);

        // Try to make another move
        const boardBeforeMove = JSON.parse(JSON.stringify(gameStore.board));
        gameStore.makeMove(2, 2);

        expect(gameStore.board).toStrictEqual(boardBeforeMove);
    });

    it('check resetGame', () => {
        const gameStore = useGameStore();

        // Play some moves
        gameStore.makeMove(0, 0);
        gameStore.makeMove(1, 1);
        gameStore.makeMove(2, 2);

        expect(gameStore.board[0]![0]).toBe(PLAYER_O);
        expect(gameStore.isFreshBoard).toBe(false);

        gameStore.resetGame();

        expect(gameStore.board).toStrictEqual([
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ]);
        expect(gameStore.currentPlayer).toBe(PLAYER_O);
        expect(gameStore.winner).toBe(null);
        expect(gameStore.isDraw).toBe(false);
        expect(gameStore.isResultOpen).toBe(false);
        expect(gameStore.isFreshBoard).toBe(true);
    });

    it('check updateGameConfig with 4x4 board', () => {
        const gameStore = useGameStore();

        gameStore.updateGameConfig({
            rows: 4,
            cols: 4,
        });

        expect(gameStore.rows).toBe(4);
        expect(gameStore.cols).toBe(4);
        expect(gameStore.board).toStrictEqual([
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ]);
        expect(gameStore.isFreshBoard).toBe(true);
    });

    it('check updateGameConfig with different default player', () => {
        const gameStore = useGameStore();

        gameStore.updateGameConfig({
            defaultPlayer: PLAYER_X,
        });

        expect(gameStore.defaultPlayer).toBe(PLAYER_X);
        expect(gameStore.currentPlayer).toBe(PLAYER_X);
    });

    it('check closeResult', () => {
        const gameStore = useGameStore();

        // Create win scenario
        gameStore.makeMove(0, 0);
        gameStore.makeMove(1, 0);
        gameStore.makeMove(0, 1);
        gameStore.makeMove(1, 1);
        gameStore.makeMove(0, 2);

        expect(gameStore.isResultOpen).toBe(true);

        gameStore.closeResult();

        expect(gameStore.isResultOpen).toBe(false);
    });

    it('check X player win', () => {
        const gameStore = useGameStore();

        // X wins
        gameStore.makeMove(0, 0); // O
        gameStore.makeMove(1, 0); // X
        gameStore.makeMove(0, 1); // O
        gameStore.makeMove(1, 1); // X
        gameStore.makeMove(2, 2); // O
        gameStore.makeMove(1, 2); // X wins

        expect(gameStore.winner).toBe(PLAYER_X);
        expect(gameStore.isGameOver).toBe(true);
    });

    it('check resultData matrix on win', () => {
        const gameStore = useGameStore();

        // O wins row 1
        gameStore.makeMove(1, 0); // O
        gameStore.makeMove(0, 0); // X
        gameStore.makeMove(1, 1); // O
        gameStore.makeMove(0, 1); // X
        gameStore.makeMove(1, 2); // O wins

        expect(gameStore.resultData.resultMatrix).toStrictEqual([
            [false, false, false],
            [true, true, true],
            [false, false, false],
        ]);
    });

    it('check multiple games with reset', () => {
        const gameStore = useGameStore();

        // Game 1
        gameStore.makeMove(0, 0);
        gameStore.makeMove(1, 0);
        gameStore.resetGame();

        // Game 2
        gameStore.makeMove(2, 2);
        expect(gameStore.board[2]![2]).toBe(PLAYER_O);
        expect(gameStore.currentPlayer).toBe(PLAYER_X);

        gameStore.resetGame();

        // Game 3
        expect(gameStore.board).toStrictEqual([
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
            [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        ]);
        expect(gameStore.currentPlayer).toBe(PLAYER_O);
    });
});
