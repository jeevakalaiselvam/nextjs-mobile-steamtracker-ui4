import {
  HEADER_LEFT_GAMES_OFF,
  HEADER_LEFT_GAMES_ON,
  HEADER_RIGHT_GAMES_OFF,
  HEADER_RIGHT_GAMES_ON,
} from "../types/menu.types";

export const headerLeftGamesOn = () => {
  return { type: HEADER_LEFT_GAMES_ON };
};

export const headerLeftGamesOff = () => {
  return { type: HEADER_LEFT_GAMES_OFF };
};

export const headerRightGamesOn = () => {
  return { type: HEADER_RIGHT_GAMES_ON };
};

export const headerRightGamesOff = () => {
  return { type: HEADER_RIGHT_GAMES_OFF };
};
