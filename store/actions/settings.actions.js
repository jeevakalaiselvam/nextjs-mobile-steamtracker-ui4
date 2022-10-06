import { GAMES_PAGE_SELECTED_GAME } from "../types/settings.types";

export const gamesPageSelectGame = (gameId) => {
  return { type: GAMES_PAGE_SELECTED_GAME, payload: gameId };
};
