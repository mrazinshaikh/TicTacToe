import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { Player } from '~/types/game.types';

export const useGameScoreStore = defineStore('game-score', () => {
    const player_wins = reactive({
        [PLAYER_O]: 0,
        [PLAYER_X]: 0,
    });

    function updateScore(player: Player) {
        player_wins[player] = (player_wins[player] ?? 0) + 1;
    }

    function reset() {
        player_wins[PLAYER_O] = 0;
        player_wins[PLAYER_X] = 0;
    }

    return {
        player_wins,

        updateScore,
        reset,
    };
}, {
    persist: {
        storage: piniaPluginPersistedstate.cookies({
            maxAge: 60 * 60,
        }),
    },
});
