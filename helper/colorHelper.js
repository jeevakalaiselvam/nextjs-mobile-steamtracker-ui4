import * as COLORS from "./constantHelper";

export const getColor = (color) => {
  switch (color) {
    case COLORS.COLOR_LIGHT1:
      return "#FFFFFF";
    case COLORS.COLOR_LIGHT2:
      return "#FEFEFE";
    case COLORS.COLOR_LIGHT3:
      return "#F5F5F5";
    case COLORS.COLOR_DARK_LIGHT1:
      return "rgba(255,255,255,0.1)";
    case COLORS.COLOR_DARK_LIGHT2:
      return "rgba(255,255,255,0.2)";
    case COLORS.COLOR_DARK_LIGHT3:
      return "rgba(255,255,255,0.4)";
    case COLORS.COLOR_DARK_LIGHT4:
      return "rgba(255,255,255,0.6)";
    case COLORS.COLOR_DARK_LIGHT5:
      return "rgba(255,255,255,0.8)";
    case COLORS.COLOR_DARK1:
      return "#FFFFFF";
    case COLORS.COLOR_DARK2:
      return "#FEFEFE";
    case COLORS.COLOR_DARK3:
      return "#F5F5F5";
    case COLORS.COLOR_DARK_TRANSPARENT1:
      return "rgba(0,0,0,0.1)";
    case COLORS.COLOR_DARK_TRANSPARENT2:
      return "rgba(0,0,0,0.2)";
    case COLORS.COLOR_DARK_TRANSPARENT3:
      return "rgba(0,0,0,0.4)";
    case COLORS.COLOR_DARK_TRANSPARENT4:
      return "rgba(0,0,0,0.6)";
    case COLORS.COLOR_DARK_TRANSPARENT5:
      return "rgba(0,0,0,0.8)";
    case COLORS.COLOR_ACCENT:
      return "#3049d1";
    case COLORS.COLOR_GOLD:
      return "#f1b51b";
    default:
      return "#FEFEFE";
  }
};
