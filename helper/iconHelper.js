import { FaTrophy } from "react-icons/fa";
import {
  TbArrowBarToUp,
  TbArrowLeftBar,
  TbArrowsShuffle2,
  TbAtom,
  TbBarrel,
  TbBarrelOff,
  TbBeer,
  TbBeerOff,
  TbBook,
  TbBookOff,
  TbCardboards,
  TbCardboardsOff,
  TbColumns,
  TbDeviceGamepad2,
  TbDotsVertical,
  TbHexagons,
  TbLockOff,
  TbMedal,
  TbMenu2,
  TbNote,
  TbNoteOff,
  TbPlayerSkipBack,
  TbPlayerTrackNext,
  TbPlayerTrackPrev,
  TbRefreshDot,
  TbRuler,
  TbRulerOff,
  TbStar,
  TbStars,
  TbSwords,
  TbTallymark4,
  TbTrophy,
  TbWorld,
  TbX,
} from "react-icons/tb";

export const ICON_REFRESH = "ICON_REFRESH";
export const ICON_TROPHY = "ICON_TROPHY";
export const ICON_MENU = "ICON_MENU";
export const ICON_CLOSE = "ICON_CLOSE";
export const ICON_THEME_SWITCH = "ICON_THEME_SWITCH";
export const ICON_DRAWER_CLOSE = "ICON_DRAWER_CLOSE";
export const ICON_SEARCH_ACTIVE = "ICON_SEARCH_ACTIVE";
export const ICON_SEARCH_CANCEL = "ICON_SEARCH_CANCEL";
export const ICON_HIDDEN = "ICON_HIDDEN";
export const ICON_PERCENTAGE = "ICON_PERCENTAGE";
export const ICON_MEDAL = "ICON_MEDAL";
export const ICON_COMPLETED_TOGGLE_DISABLED = "ICON_COMPLETED_TOGGLE_DISABLED";
export const ICON_COMPLETED_TOGGLE_ACTIVE = "ICON_COMPLETED_TOGGLE_ACTIVE";
export const ICON_GAMES = "ICON_GAMES";
export const ICON_OPTIONS_DROPDOWN = "ICON_OPTIONS_DROPDOWN";
export const ICON_OPTIONS_CLOSE = "ICON_OPTIONS_CLOSE";
export const ICON_SORT_OPTION = "ICON_SORT_OPTION";

export const getIcon = (type) => {
  switch (type) {
    case ICON_REFRESH:
      return <TbRefreshDot />;
    case ICON_TROPHY:
      return <FaTrophy />;
    case ICON_MENU:
      return <TbMenu2 />;
    case ICON_DRAWER_CLOSE:
      return <TbArrowLeftBar />;
    case ICON_CLOSE:
      return <TbX />;
    case ICON_SEARCH_ACTIVE:
      return <TbRuler />;
    case ICON_SEARCH_CANCEL:
      return <TbRulerOff />;
    case ICON_THEME_SWITCH:
      return <TbAtom />;
    case ICON_HIDDEN:
      return <TbLockOff />;
    case ICON_PERCENTAGE:
      return <TbWorld />;
    case ICON_MEDAL:
      return <TbStars />;
    case ICON_COMPLETED_TOGGLE_DISABLED:
      return <TbCardboards />;
    case ICON_COMPLETED_TOGGLE_ACTIVE:
      return <TbCardboardsOff />;
    case ICON_GAMES:
      return <TbDeviceGamepad2 />;
    case ICON_OPTIONS_DROPDOWN:
      return <TbDotsVertical />;
    case ICON_OPTIONS_CLOSE:
      return <TbArrowBarToUp />;
    case ICON_SORT_OPTION:
      return <TbColumns />;
    default:
      return <TbTrophy />;
  }
};
