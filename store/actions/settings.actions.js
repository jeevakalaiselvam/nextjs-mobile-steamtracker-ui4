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
  GAME_PAGE_TOGGLE_COMPLETED,
  GAME_PAGE_TOGGLE_OPTIONS,
} from "../types/settings.types";

//GAMES PAGE ACTIONS

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

export const gamesPageToggleOptions = (toggleOptions) => {
  return { type: GAMES_PAGE_TOGGLE_OPTIONS, payload: toggleOptions };
};

export const gamesPageSortOptions = (sortOption) => {
  return { type: GAMES_PAGE_SORT_OPTIONS, payload: sortOption };
};

export const gamePageSelectGame = (gameId) => {
  return { type: GAME_PAGE_SELECTED_GAME, payload: gameId };
};

//GAME PAGE ACTIONS

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

export const gamePageToggleOptions = (toggleOptions) => {
  return { type: GAME_PAGE_TOGGLE_OPTIONS, payload: toggleOptions };
};

export const gamePageSortOptions = (sortOption) => {
  return { type: GAME_PAGE_TOGGLE_OPTIONS, payload: sortOption };
};
