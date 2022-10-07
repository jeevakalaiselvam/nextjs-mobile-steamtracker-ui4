import {
  SORT_ACHIEVEMENTS_ALL,
  SORT_GAMES_COMPLETTION,
} from "../../helper/sortHelper";
import {
  GAMES_PAGE_DRAWER_TOGGLE,
  GAMES_PAGE_SEARCH_SHOW,
  GAMES_PAGE_SEARCH_TERM,
  GAMES_PAGE_SELECTED_GAME,
  GAMES_PAGE_SORT_OPTIONS,
  GAMES_PAGE_TOGGLE_OPTIONS,
  GAME_PAGE_DRAWER_TOGGLE,
  GAME_PAGE_SEARCH_SHOW,
  GAME_PAGE_SEARCH_TERM,
  GAME_PAGE_SELECTED_GAME,
  GAME_PAGE_SORT_OPTIONS,
  GAME_PAGE_TOGGLE_COMPLETED,
  GAME_PAGE_TOGGLE_OPTIONS,
} from "../types/settings.types";

const INITIAL_STATE = {
  gamesPageSettings: {
    selectedGameId: "",
    searchTerm: "",
    drawerOpen: false,
    searchShow: false,
    toggleCompleted: false,
    sortOption: SORT_GAMES_COMPLETTION,
  },
  gamePageSettings: {
    selectedGameId: "",
    searchTerm: "",
    drawerOpen: false,
    searchShow: false,
    toggleCompleted: false,
    sortOption: SORT_ACHIEVEMENTS_ALL,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    //GAMES PAGE REDUCER
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

    case GAMES_PAGE_TOGGLE_OPTIONS:
      return {
        ...state,
        gamesPageSettings: {
          ...state.gamesPageSettings,
          toggleOptions: payload,
        },
      };

    case GAMES_PAGE_SORT_OPTIONS:
      return {
        ...state,
        gamesPageSettings: {
          ...state.gamesPageSettings,
          sortOption: payload,
        },
      };

    //GAME PAGE REDUCER

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

    case GAME_PAGE_TOGGLE_OPTIONS:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          toggleOptions: payload,
        },
      };

    case GAME_PAGE_SORT_OPTIONS:
      return {
        ...state,
        gamePageSettings: {
          ...state.gamePageSettings,
          sortOption: payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
