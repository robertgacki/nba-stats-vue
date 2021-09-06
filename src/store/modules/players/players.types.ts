export type State = {
  pending: boolean;
  currentPage: number;
  totalPages: number;
  players: ApiResponseData[];
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

export type ApiResponse = {
  data: ApiResponseData[];
  meta: ApiResponseMeta;
};

type ApiResponseMeta = {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
};

export type ApiResponseData = {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: ApiResponseDataTeam;
};

type ApiResponseDataTeam = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
};

export enum MutationTypes {
  SET_PENDING_STATE = "setPendingState",
  SET_CURRENT_PAGE = "setCurrentPage",
  SET_TOTAL_PAGES = "setTotalPages",
  SET_PLAYERS = "setPlayers",
}

export enum ActionsTypes {
  FETCH = "fetch",
}

export enum GettersTypes {
  GET_PLAYERS = "getPlayers",
  GET_TOTAL_PAGES = "getTotalPages",
  GET_CURRENT_PAGE = "getCurrentPage",
  GET_PENDING = "getPending",
}
