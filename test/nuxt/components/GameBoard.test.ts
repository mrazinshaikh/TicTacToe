import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import GameBoard from '~/components/GameBoard.vue';
import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';

describe('check GameBoard component', () => {
    beforeEach(() => {
        // Clear localStorage to avoid persisted state issues
        if (typeof localStorage !== 'undefined') {
            localStorage.clear();
        }
        setActivePinia(createPinia());
    });

    it('check component mounts', async () => {
        const wrapper = await mountSuspended(GameBoard);

        expect(wrapper.exists()).toBe(true);
    });

    it('check 3x3 board renders correctly', async () => {
        const wrapper = await mountSuspended(GameBoard);

        // Should have 9 cells (3x3)
        const cells = wrapper.findAll('.group');
        expect(cells).toHaveLength(9);
    });

    it('check 4x4 board renders correctly', async () => {
        const wrapper = await mountSuspended(GameBoard);
        const game = useGameStore();

        game.updateGameConfig({ rows: 4, cols: 4 });
        await wrapper.vm.$nextTick();

        // Should have 16 cells (4x4)
        const cells = wrapper.findAll('.group');
        expect(cells).toHaveLength(16);
    });

    it('check cell click makes move', async () => {
        const wrapper = await mountSuspended(GameBoard);
        const game = useGameStore();

        game.resetGame();
        expect(game.board[0]?.[0]).toBe(null);

        const checkboxes = wrapper.findAllComponents({ name: 'UCheckbox' });
        expect(checkboxes.length).toBeGreaterThan(0);

        checkboxes[0]?.vm.$emit('update:modelValue', true);
        await wrapper.vm.$nextTick();

        expect(game.board[0]?.[0]).toBe(PLAYER_O);
        expect(game.currentPlayer).toBe(PLAYER_X);
    });

    it('check clicking occupied cell does nothing', async () => {
        const wrapper = await mountSuspended(GameBoard);
        const game = useGameStore();

        game.resetGame();
        const checkboxes = wrapper.findAllComponents({ name: 'UCheckbox' });
        expect(checkboxes.length).toBeGreaterThan(0);

        // First move via component event
        checkboxes[0]?.vm.$emit('update:modelValue', true);
        await wrapper.vm.$nextTick();

        expect(game.board[0]?.[0]).toBe(PLAYER_O);
        expect(game.currentPlayer).toBe(PLAYER_X);

        // Try making move on same cell again
        checkboxes[0]?.vm.$emit('update:modelValue', true);
        await wrapper.vm.$nextTick();

        expect(game.board[0]?.[0]).toBe(PLAYER_O);
        expect(game.currentPlayer).toBe(PLAYER_X);
    });

    it('check board displays player moves', async () => {
        const wrapper = await mountSuspended(GameBoard);
        const game = useGameStore();

        game.resetGame();
        game.makeMove(0, 0); // O
        game.makeMove(0, 1); // X
        await wrapper.vm.$nextTick();

        // Check board has moves
        expect(game.board[0]?.[0]).toBe(PLAYER_O);
        expect(game.board[0]?.[1]).toBe(PLAYER_X);
    });

    it('check win condition shows result', async () => {
        const wrapper = await mountSuspended(GameBoard);
        const game = useGameStore();

        // Ensure clean state
        game.updateGameConfig({ rows: 3, cols: 3, defaultPlayer: PLAYER_O });
        await wrapper.vm.$nextTick();

        // Create winning scenario
        game.makeMove(0, 0); // O
        expect(game.board[0]?.[0]).toBe(PLAYER_O);

        game.makeMove(1, 0); // X
        game.makeMove(0, 1); // O
        game.makeMove(1, 1); // X
        game.makeMove(0, 2); // O wins
        await wrapper.vm.$nextTick();

        expect(game.winner).toBe(PLAYER_O);
        expect(game.isGameOver).toBe(true);
    });

    it('check grid layout styles', async () => {
        const wrapper = await mountSuspended(GameBoard);

        const grid = wrapper.find('.grid');
        expect(grid.exists()).toBe(true);
    });

    it('check board loading state', async () => {
        const wrapper = await mountSuspended(GameBoard);
        const game = useGameStore();

        game.isBoardLoading = true;
        await wrapper.vm.$nextTick();

        const grid = wrapper.find('.grid');
        expect(grid.classes()).toContain('opacity-10');
    });
});
