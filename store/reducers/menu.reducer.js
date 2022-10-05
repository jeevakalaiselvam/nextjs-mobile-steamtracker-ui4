import {
  HEADER_LEFT_GAMES_OFF,
  HEADER_LEFT_GAMES_ON,
  HEADER_RIGHT_GAMES_OFF,
  HEADER_RIGHT_GAMES_ON,
} from "../types/menu.types";
const INITIAL_STATE = {
  gamesPageMenu: {
    left: false,
    right: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case HEADER_LEFT_GAMES_OFF:
      return {
        ...state,
        gamesPageMenu: {
          ...state.gamesPageMenu,
          left: false,
        },
      };
    case HEADER_LEFT_GAMES_ON:
      return {
        ...state,
        gamesPageMenu: {
          ...state.gamesPageMenu,
          left: true,
        },
      };
    case HEADER_RIGHT_GAMES_OFF:
      return {
        ...state,
        gamesPageMenu: {
          ...state.gamesPageMenu,
          right: false,
        },
      };
    case HEADER_RIGHT_GAMES_ON:
      return {
        ...state,
        gamesPageMenu: {
          ...state.gamesPageMenu,
          right: false,
        },
      };

    default:
      return state;
  }
};

export default reducer;
