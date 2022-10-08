export const COLOR_GOLD_TROPHY = "COLOR_GOLD_TROPHY";
export const COLOR_REFRESH_INACTIVE = "COLOR_REFRESH_INACTIVE";
export const COLOR_REFRESH_ACTIVE = "COLOR_REFRESH_ACTIVE";
export const COLOR_CLOSE_RED = "COLOR_CLOSE_RED";
export const COLOR_TEXT_DULL = "COLOR_TEXT_DULL";
export const COLOR_TEXT_DULL_BRIGHT = "COLOR_TEXT_DULL_BRIGHT";
export const COLOR_TEXT_DRAWER_ICON = "COLOR_TEXT_DRAWER_ICON";
export const COLOR_PLATINUM_TROPHY = "COLOR_PLATINUM_TROPHY";
export const COLOR_ACCENT = "COLOR_ACCENT";
export const COLOR_XBOX = "COLOR_XBOX";

export const getColor = (type) => {
  switch (type) {
    case COLOR_ACCENT:
      return "#3049d1";
    case COLOR_GOLD_TROPHY:
      return "#0e7a0d";
    case COLOR_PLATINUM_TROPHY:
      return "#0e7a0d";
    case COLOR_REFRESH_INACTIVE:
      return "#fefefe";
    case COLOR_REFRESH_ACTIVE:
      return "#0e7a0d";
    case COLOR_XBOX:
      return "#0e7a0d";
    case COLOR_CLOSE_RED:
      return "#ff4858";
    case COLOR_TEXT_DULL_BRIGHT:
      return "#afb6cc";
    case COLOR_TEXT_DULL:
      return "#737c9d";
    case COLOR_TEXT_DRAWER_ICON:
      return "#fefefeee";

    default:
      return "#fefefe";
  }
};
