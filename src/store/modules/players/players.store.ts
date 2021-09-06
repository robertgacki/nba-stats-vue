import { ActionContext, Module } from "vuex";
import {
  State,
  ActionsTypes,
  MutationTypes,
  GettersTypes,
  ApiResponse,
  ApiResponseData,
  Player,
} from "./players.types";
import { RootState } from "@/store";

const state: State = {
  pending: false,
  currentPage: 1,
  totalPages: 0,
  players: [],
};

const mutations = {
  [MutationTypes.SET_PENDING_STATE](state: State, payload: boolean): void {
    state.pending = payload;
  },
  [MutationTypes.SET_CURRENT_PAGE](state: State, payload: number): void {
    if (state.totalPages > payload) {
      state.currentPage = payload;
    } else {
      state.currentPage = state.totalPages;
    }
  },
  [MutationTypes.SET_TOTAL_PAGES](state: State, payload: number): void {
    state.totalPages = payload;
  },
  [MutationTypes.SET_PLAYERS](state: State, payload: ApiResponseData[]): void {
    state.players = payload;
  },
};

const actions = {
  async [ActionsTypes.FETCH](
    { commit }: ActionContext<State, RootState>,
    { page, search }: { page: number; search: string }
  ): Promise<void> {
    commit(MutationTypes.SET_PENDING_STATE, true);

    try {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players?page=${page}&search=${search}`
      );
      const { meta, data } = (await response.json()) as ApiResponse;

      commit(MutationTypes.SET_TOTAL_PAGES, meta.total_pages);
      commit(MutationTypes.SET_CURRENT_PAGE, meta.current_page);
      commit(MutationTypes.SET_PLAYERS, data);
    } finally {
      commit(MutationTypes.SET_PENDING_STATE, false);
    }
  },
};

function decoratePlayer(player: ApiResponseData): Player {
  return {
    id: player.id,
    firstName: player.first_name,
    lastName: player.last_name,
    height: player.height_feet
      ? `${player.height_feet}'${player.height_inches}"`
      : "",
    weight: player.weight_pounds ? `${player.weight_pounds} lbs` : "",
    position: player.position,
    teamName: player.team.full_name,
  };
}

const getters = {
  [GettersTypes.GET_PLAYERS](state: State): Player[] {
    return state.players.map(decoratePlayer);
  },
  [GettersTypes.GET_CURRENT_PAGE](state: State): number {
    return state.currentPage;
  },
  [GettersTypes.GET_TOTAL_PAGES](state: State): number {
    return state.totalPages;
  },
  [GettersTypes.GET_PENDING](state: State): boolean {
    return state.pending;
  },
};

const module: Module<State, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default module;
