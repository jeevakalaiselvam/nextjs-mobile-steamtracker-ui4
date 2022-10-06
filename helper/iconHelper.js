import { FaTrophy, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import {
  TbCrutches,
  TbList,
  TbMenu,
  TbMenu2,
  TbRefresh,
  TbRefreshDot,
  TbSearch,
  TbTrophy,
  TbZoomCancel,
  TbZoomQuestion,
} from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";

export const ICON_REFRESH = "ICON_REFRESH";
export const ICON_TROPHY = "ICON_TROPHY";
export const ICON_MENU = "ICON_MENU";
export const ICON_CLOSE = "ICON_CLOSE";
export const ICON_SEARCH_ACTIVE = "ICON_SEARCH_ACTIVE";
export const ICON_SEARCH_CANCEL = "ICON_SEARCH_CANCEL";

export const getIcon = (type) => {
  switch (type) {
    case ICON_REFRESH:
      return <TbRefreshDot />;
    case ICON_TROPHY:
      return <TbTrophy />;
    case ICON_MENU:
      return <TbMenu2 />;
    case ICON_CLOSE:
      return <TbCrutches />;
    case ICON_SEARCH_ACTIVE:
      return <TbZoomQuestion />;
    case ICON_SEARCH_CANCEL:
      return <TbZoomCancel />;
    default:
      return <TbTrophy />;
  }
};
