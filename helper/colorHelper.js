export const COLOR_GOLD_TROPHY = "COLOR_GOLD_TROPHY";
export const COLOR_REFRESH_INACTIVE = "COLOR_REFRESH_INACTIVE";
export const COLOR_REFRESH_ACTIVE = "COLOR_REFRESH_ACTIVE";
export const COLOR_CLOSE_RED = "COLOR_CLOSE_RED";
export const COLOR_TEXT_DULL = "COLOR_TEXT_DULL";
export const COLOR_TEXT_DRAWER_ICON = "COLOR_TEXT_DRAWER_ICON";

export const getColor = (type) => {
  switch (type) {
    case COLOR_GOLD_TROPHY:
      return "#f1b51b";
    case COLOR_REFRESH_INACTIVE:
      return "#fefefe";
    case COLOR_REFRESH_ACTIVE:
      return "#6cff5c";
    case COLOR_CLOSE_RED:
      return "#ff4858";
    case COLOR_TEXT_DULL:
      return "#737c9d";
    case COLOR_TEXT_DRAWER_ICON:
      return "#fefefeee";

    default:
      return "#fefefe";
  }
};
