import { FaTrophy, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import {
  TbBrandChrome,
  TbBrandCodepen,
  TbComponents,
  TbCrutches,
  TbList,
  TbLockOff,
  TbMenu,
  TbMenu2,
  TbNote,
  TbNoteOff,
  TbPlayerTrackNext,
  TbPlayerTrackPrev,
  TbRefresh,
  TbRefreshDot,
  TbSearch,
  TbSum,
  TbSumOff,
  TbTrophy,
  TbWorld,
  TbX,
  TbZoomCancel,
  TbZoomQuestion,
} from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";

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

export const getIcon = (type) => {
  switch (type) {
    case ICON_REFRESH:
      return <TbRefreshDot />;
    case ICON_TROPHY:
      return <FaTrophy />;
    case ICON_MENU:
      return <TbMenu2 />;
    case ICON_DRAWER_CLOSE:
      return <TbPlayerTrackPrev />;
    case ICON_CLOSE:
      return <TbX />;
    case ICON_SEARCH_ACTIVE:
      return <TbNote />;
    case ICON_SEARCH_CANCEL:
      return <TbNoteOff />;
    case ICON_THEME_SWITCH:
      return <TbPlayerTrackNext />;
    case ICON_HIDDEN:
      return <TbLockOff />;
    case ICON_PERCENTAGE:
      return <TbWorld />;
    default:
      return <TbTrophy />;
  }
};
