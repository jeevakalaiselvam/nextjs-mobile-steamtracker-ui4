import {
  GAMES_PAGE_DRAWER_TOGGLE,
  GAMES_PAGE_SEARCH_SHOW,
  GAMES_PAGE_SEARCH_TERM,
  GAMES_PAGE_SELECTED_GAME,
  GAME_PAGE_DRAWER_TOGGLE,
  GAME_PAGE_SEARCH_SHOW,
  GAME_PAGE_SEARCH_TERM,
  GAME_PAGE_SELECTED_GAME,
  GAME_PAGE_TOGGLE_COMPLETED,
} from "../types/settings.types";

const INITIAL_STATE = {
  gamesPageSettings: {
    selectedGameId: "",
    searchTerm: "",
    drawerOpen: false,
    searchShow: false,
  },
  gamePageSettings: {
    selectedGameId: "",
    searchTerm: "",
    drawerOpen: false,
    searchShow: false,
    toggleCompleted: false,
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

    case GAMES_PAGE_DRAWER_TOGGLE:
      return {
        ...state,
        gamesPageSettings: {
          ...state.gamesPageSettings,
          drawerOpen: payload,
        },
      };
    case GAMES_PAGE_SEARCH_SHOW:
      return {
        ...state,
        gamesPageSettings: {
          ...state.gamesPageSettings,
          searchShow: payload,
        },
      };

    case GAME_PAGE_SELECTED_GAME:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          selectedGameId: payload,
        },
      };
    case GAME_PAGE_SEARCH_TERM:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          searchTerm: payload,
        },
      };

    case GAME_PAGE_DRAWER_TOGGLE:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          drawerOpen: payload,
        },
      };
    case GAME_PAGE_SEARCH_SHOW:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          searchShow: payload,
        },
      };

    case GAME_PAGE_TOGGLE_COMPLETED:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          toggleCompleted: payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
