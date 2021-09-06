export type State = {
  pending: boolean;
  stats: ApiResponseData[];
};

export type Stats = {
  playerId: number | null;
  season: number | null;
  gamesPlayed: number | null;
  minutesPlayed: string;
  rebounds: number | null;
  defensiveRebounds: number | null;
  offensiveRebounds: number | null;
  points: number | null;
  assists: number | null;
  blocks: number | null;
  steals: number | null;
};

export type ApiResponse = {
  data: ApiResponseData[];
};

export type ApiResponseData = {
  ast: number | null;
  blk: number | null;
  dreb: number | null;
  fg3_pct: number | null;
  fg3a: number | null;
  fg3m: number | null;
  fg_pct: number | null;
  fga: number | null;
  fgm: number | null;
  ft_pct: number | null;
  fta: number | null;
  ftm: number | null;
  games_played: number | null;
  min: string;
  oreb: number | null;
  pf: number | null;
  player_id: number | null;
  pts: number | null;
  reb: number | null;
  season: number | null;
  stl: number | null;
  turnover: number | null;
};

export enum MutationTypes {
  SET_PENDING_STATE = "setPendingState",
  ADD_STATS = "addStats",
}

export enum ActionsTypes {
  FETCH = "fetch",
}

export enum GettersTypes {
  GET_PENDING = "getPending",
  GET_PLAYER_SEASONS_STATS = "getPlayerSeasonsStats",
  EXISTS_PLAYER_SEASON_STATS = "existsPlayerSeasonStats",
}
