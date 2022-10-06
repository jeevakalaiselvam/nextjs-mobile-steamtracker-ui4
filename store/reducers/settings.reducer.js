import {
  GAMES_PAGE_SEARCH_TERM,
  GAMES_PAGE_SELECTED_GAME,
} from "../types/settings.types";

const INITIAL_STATE = {
  gamesPageSettings: {
    selectedGameId: "",
    searchTerm: "",
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GAMES_PAGE_SELECTED_GAME:
      return {
        ...state,
        gamesPageSettings: {
          ...state.gamesPageSettings,
          selectedGameId: payload,
        },
      };
    case GAMES_PAGE_SEARCH_TERM:
      return {
        ...state,
        gamesPageSettings: {
          ...state.gamesPageSettings,
          searchTerm: payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
