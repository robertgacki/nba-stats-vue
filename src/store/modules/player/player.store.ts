import { ActionContext, Module } from "vuex";
import {
  State,
  ActionsTypes,
  MutationTypes,
  GettersTypes,
  ApiResponseData,
  Player,
} from "./player.types";
import { RootState } from "@/store";

const initialState = () => {
  return {
    pending: false,
    player: {
      id: null,
      first_name: "",
      last_name: "",
      position: "",
      height_feet: null,
      height_inches: null,
      weight_pounds: null,
      team: {
        id: null,
        abbreviation: "",
        city: "",
        conference: "",
        division: "",
        full_name: "",
        name: "",
      },
    },
  } as State;
};

const state: State = initialState();

const mutations = {
  [MutationTypes.SET_PENDING_STATE](state: State, payload: boolean): void {
    state.pending = payload;
  },
  [MutationTypes.SET_PLAYER](state: State, payload: ApiResponseData): void {
    state.player = payload;
  },
  [MutationTypes.CLEAR](state: State): void {
    state.player = initialState().player;
  },
};

const actions = {
  async [ActionsTypes.FETCH](
    { commit }: ActionContext<State, RootState>,
    playerId: number
  ): Promise<void> {
    commit(MutationTypes.CLEAR);
    commit(MutationTypes.SET_PENDING_STATE, true);

    try {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/players/${playerId}`
      );
      const player: ApiResponseData = await response.json();

      commit(MutationTypes.SET_PLAYER, player);
    } finally {
      commit(MutationTypes.SET_PENDING_STATE, false);
    }
  },
};

function decoratePlayer(player: ApiResponseData): Player {
  return {
    id: Number(player.id),
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
  [GettersTypes.GET_PLAYER](state: State): Player {
    return decoratePlayer(state.player);
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
