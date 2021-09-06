export type State = {
  pending: boolean;
  player: ApiResponseData;
};

export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  height: string;
  weight: string;
  teamName: string;
};

export interface ApiResponseData {
  id: number | null;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  team: ApiResponseDataTeam;
}

interface ApiResponseDataTeam {
  id: number | null;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export enum MutationTypes {
  SET_PENDING_STATE = "setPendingState",
  SET_PLAYER = "setPlayer",
  CLEAR = "clear",
}

export enum ActionsTypes {
  FETCH = "fetch",
}

export enum GettersTypes {
  GET_PLAYER = "getPlayers",
  GET_PENDING = "getPending",
}
