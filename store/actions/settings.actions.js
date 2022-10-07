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

export const gamesPageSelectGame = (gameId) => {
  return { type: GAMES_PAGE_SELECTED_GAME, payload: gameId };
};

export const gamesPageSearchTerm = (searchTerm) => {
  return { type: GAMES_PAGE_SEARCH_TERM, payload: searchTerm };
};

export const gamesPageDrawerToggle = (drawerOpen) => {
  return { type: GAMES_PAGE_DRAWER_TOGGLE, payload: drawerOpen };
};

export const gamesPageSearchShow = (searchShow) => {
  return { type: GAMES_PAGE_SEARCH_SHOW, payload: searchShow };
};

export const gamePageSelectGame = (gameId) => {
  return { type: GAME_PAGE_SELECTED_GAME, payload: gameId };
};

export const gamePageSearchTerm = (searchTerm) => {
  return { type: GAME_PAGE_SEARCH_TERM, payload: searchTerm };
};

export const gamePageDrawerToggle = (drawerOpen) => {
  return { type: GAME_PAGE_DRAWER_TOGGLE, payload: drawerOpen };
};

export const gamePageSearchShow = (searchShow) => {
  return { type: GAME_PAGE_SEARCH_SHOW, payload: searchShow };
};

export const gamePageToggleCompleted = (toggleCompleted) => {
  return { type: GAME_PAGE_TOGGLE_COMPLETED, payload: toggleCompleted };
};
