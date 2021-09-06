import { createLogger, createStore } from "vuex";

import players from "./modules/players/players.store";
import player from "./modules/player/player.store";
import stats from "./modules/stats/stats.store";

export type RootState = {
  errorMessage: string;
};

const state = () => {
  return {
    errorMessage: "",
  } as RootState;
};

export default createStore<RootState>({
  state,
  modules: { players, player, stats },
  plugins: [createLogger()],
});
