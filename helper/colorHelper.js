export const COLOR_MAIN_BACKGROUND = "COLOR_MAIN_BACKGROUND";
export const COLOR_GAME_SELECT_OPTION = "COLOR_GAME_SELECT_OPTION";

export const getColor = (type) => {
  switch (type) {
    case COLOR_MAIN_BACKGROUND:
      return "rbga(0,0,0,1)";
    case COLOR_GAME_SELECT_OPTION:
      return "rbga(0,0,0,0.5)";
    default:
      return "rbga(0,0,0,0.5)";
  }
};
