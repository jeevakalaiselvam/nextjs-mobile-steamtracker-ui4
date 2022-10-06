import {
  GAMES_PAGE_DRAWER_TOGGLE,
  GAMES_PAGE_SEARCH_TERM,
  GAMES_PAGE_SELECTED_GAME,
} from "../types/settings.types";

export const gamesPageSelectGame = (gameId) => {
  return { type: GAMES_PAGE_SELECTED_GAME, payload: gameId };
};

export const gamesPageSearchTerm = (searchTerm) => {
  return { type: GAMES_PAGE_SEARCH_TERM, payload: searchTerm };
};

export const gamesPageDrawerToggle = (drawerOpen) => {
  return { type: GAMES_PAGE_DRAWER_TOGGLE, payload: drawerOpen };
};
