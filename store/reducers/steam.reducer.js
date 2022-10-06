import {
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  SET_HIDDEN_ACHIEVEMENTS_GAME,
} from "../types/steam.types";

const INITIAL_STATE = {
  games: [],
  hiddenAchievements: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_GAMES_REQUEST:
      return {
        ...state,
        games: [],
      };
    case FETCH_ALL_GAMES_SUCCESS:
      return {
        ...state,
        games: payload,
      };
    case FETCH_ALL_GAMES_SUCCESS:
      return {
        ...state,
        games: [],
      };
    case SET_HIDDEN_ACHIEVEMENTS_GAME:
      return {
        ...state,
        hiddenAchievements: {
          ...state.hiddenAchievements,
          [payload.gameId]: payload.hiddenAchievements,
        },
      };
    default:
      return state;
  }
};

export default reducer;
