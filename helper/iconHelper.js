import { HiDotsVertical, HiMenu, HiXCircle } from "react-icons/hi";
import {
  ICON_CLOSE,
  ICON_MENU,
  ICON_OPTIONS,
  ICON_TROPHY,
} from "./constantHelper";
import { FaTrophy } from "react-icons/fa";

export const getIcon = (type) => {
  switch (type) {
    case ICON_MENU:
      return <HiMenu />;
    case ICON_OPTIONS:
      return <HiDotsVertical />;
    case ICON_TROPHY:
      return <FaTrophy />;
    case ICON_CLOSE:
      return <HiXCircle />;
    default:
      return <HiMenu />;
  }
};
