import { ActionContext, Module } from "vuex";
import {
  ActionsTypes,
  ApiResponse,
  GettersTypes,
  MutationTypes,
  State,
} from "./stats.types";
import { RootState } from "@/store";
import { ApiResponseData, Stats } from "@/store/modules/stats/stats.types";

const initialState = () => {
  return {
    pending: false,
    stats: [],
  } as State;
};

const state: State = initialState();

const mutations = {
  [MutationTypes.SET_PENDING_STATE](state: State, payload: boolean): void {
    state.pending = payload;
  },
  [MutationTypes.ADD_STATS](state: State, payload: ApiResponseData[]): void {
    payload
      .filter((stats) => !!stats)
      .forEach((stats) => state.stats.push(stats));
  },
};

type FetchActionPayload = {
  playerId: number;
  startSeason: number;
  endSeason: number;
};

const fetchSeasonStats = async (season: number, playerId: number) => {
  const response = await fetch(
    `https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerId}`
  );
  const { data } = (await response.json()) as ApiResponse;

  return data[0];
};

const actions = {
  async [ActionsTypes.FETCH](
    { commit, getters }: ActionContext<State, RootState>,
    { playerId, startSeason, endSeason }: FetchActionPayload
  ): Promise<void> {
    commit(MutationTypes.SET_PENDING_STATE, true);

    try {
      const promises = [];
      const isDataExists = getters[GettersTypes.EXISTS_PLAYER_SEASON_STATS];

      for (let season = startSeason; season <= endSeason; season++) {
        if (!isDataExists({ season, playerId })) {
          promises.push(fetchSeasonStats(season, playerId));
        }
      }
      const stats = await Promise.all(promises);

      commit(MutationTypes.ADD_STATS, stats);
    } finally {
      commit(MutationTypes.SET_PENDING_STATE, false);
    }
  },
};

function decorateStats(stats: ApiResponseData): Stats {
  return {
    playerId: stats.player_id,
    season: stats.season,
    gamesPlayed: stats.games_played,
    minutesPlayed: stats.min,
    rebounds: stats.reb,
    defensiveRebounds: stats.dreb,
    offensiveRebounds: stats.oreb,
    points: stats.pts,
    assists: stats.ast,
    blocks: stats.blk,
    steals: stats.stl,
  };
}

const getters = {
  [GettersTypes.GET_PENDING](state: State): boolean {
    return state.pending;
  },
  [GettersTypes.GET_PLAYER_SEASONS_STATS](state: State) {
    return (playerId: number): Stats[] =>
      state.stats
        .filter((stats) => stats.player_id === playerId)
        .map((stats) => decorateStats(stats))
        .sort((a, b) => Number(a.season) - Number(b.season));
  },
  [GettersTypes.EXISTS_PLAYER_SEASON_STATS](state: State) {
    return ({
      playerId,
      season,
    }: {
      playerId: number;
      season: number;
    }): boolean =>
      !!state.stats.find(
        (stats) => stats.player_id === playerId && stats.season === season
      );
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default module;
