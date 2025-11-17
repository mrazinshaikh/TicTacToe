import { PLAYER_O, PLAYER_X } from '~/constants/game.constants';
import type { Player } from '~/types/game.types';

export const useGameScore = defineStore('game-score', () => {
    const player_wins = reactive({
        [PLAYER_O]: 0,
        [PLAYER_X]: 0,
    });

    function updateScore(player: Player) {
        player_wins[player] = (player_wins[player] ?? 0) + 1;
        console.log(player_wins.value);
    }

    return { player_wins, updateScore };
}, {
    persist: {
        storage: piniaPluginPersistedstate.cookies({
            maxAge: 60 * 60,
        }),
    },
});
