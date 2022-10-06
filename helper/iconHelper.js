import { FaTrophy, FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { TbRefresh, TbSearch } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";

export const ICON_REFRESH = "ICON_REFRESH";
export const ICON_TROPHY = "ICON_TROPHY";
export const ICON_MENU = "ICON_MENU";
export const ICON_CLOSE = "ICON_CLOSE";
export const ICON_SEARCH = "ICON_SEARCH";

export const getIcon = (type) => {
  switch (type) {
    case ICON_REFRESH:
      return <TbRefresh />;
    case ICON_TROPHY:
      return <FaTrophy />;
    case ICON_MENU:
      return <HiMenu />;
    case ICON_CLOSE:
      return <IoIosCloseCircle />;
    case ICON_SEARCH:
      return <TbSearch />;
    default:
      return <FaTrophy />;
  }
};
