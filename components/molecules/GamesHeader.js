import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_REFRESH_ACTIVE,
  COLOR_REFRESH_INACTIVE,
  COLOR_TEXT_DRAWER_ICON,
  COLOR_TEXT_DULL,
  getColor,
} from "../../helper/colorHelper";
import {
  getIcon,
  ICON_CLOSE,
  ICON_MENU,
  ICON_OPTIONS_CLOSE,
  ICON_OPTIONS_DROPDOWN,
  ICON_REFRESH,
  ICON_SEARCH,
  ICON_SEARCH_ACTIVE,
  ICON_SEARCH_CANCEL,
  ICON_SORT_OPTION,
} from "../../helper/iconHelper";
import {
  SORT_ACHIEVEMENTS_ALL,
  SORT_ACHIEVEMENTS_LOCKED,
  SORT_ACHIEVEMENTS_UNLOCKED,
  SORT_GAMES_COMPLETION,
  SORT_GAMES_NAMES_AZ,
  SORT_GAMES_NAMES_ZA,
} from "../../helper/sortHelper";
import {
  gamesPageDrawerToggle,
  gamesPageSearchShow,
  gamesPageSortOptions,
  gamesPageToggleOptions,
} from "../../store/actions/settings.actions";
import LevelCount from "../atoms/LevelCount";
import OptionItem from "../atoms/OptionItem";
import TrophyCount from "../atoms/TrophyCount";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 55px;
  max-height: 55px;
  color: ${(props) => getColor(COLOR_TEXT_DRAWER_ICON)};
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  padding-left: 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  font-size: 2.25rem;
  padding: 4px;
`;

const MiddleLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  flex: 1;
`;

const MiddleRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  flex: 1;
`;

const RightBefore = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-right: 1rem;
  justify-content: center;
  font-size: 2.25rem;
  padding: 4px;
  color: ${(props) => getColor(COLOR_TEXT_DRAWER_ICON)};
  position: relative;
`;

const LeftAfter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2.25rem;
  padding: 4px;
  margin-left: 1rem;
  color: ${(props) => getColor(COLOR_TEXT_DRAWER_ICON)};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2.25rem;
  padding: 4px;
  color: ${(props) =>
    props.rotate
      ? getColor(COLOR_REFRESH_INACTIVE)
      : getColor(COLOR_REFRESH_INACTIVE)};
  -webkit-animation: ${(props) =>
    props.rotate ? "spin 1s linear infinite" : ""};
  -moz-animation: ${(props) => (props.rotate ? "spin 1s linear infinite" : "")};
  animation: ${(props) => (props.rotate ? "spin 1s linear infinite" : "")};

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

const OptionsMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 250px;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`;

const CloseButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export default function GamesHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { drawerOpen, searchShow, toggleOptions } = gamesPageSettings;

  const [rotate, setRotate] = useState(false);

  const menuClickHandler = () => {
    dispatch(gamesPageDrawerToggle(!drawerOpen));
  };

  const refreshClickHandler = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
      router.push("/");
    }, 1000);
  };

  const searchClickHandler = () => {
    dispatch(gamesPageSearchShow(!searchShow));
  };

  const showOptionsToggle = () => {
    dispatch(gamesPageToggleOptions(!toggleOptions));
  };

  const optionClickHandler = (sortType) => {
    dispatch(gamesPageSortOptions(sortType));
  };

  return (
    <Container>
      <Left onClick={menuClickHandler}>
        {drawerOpen ? getIcon(ICON_MENU) : getIcon(ICON_MENU)}
      </Left>
      <LeftAfter onClick={searchClickHandler}>
        {!searchShow && getIcon(ICON_SEARCH_ACTIVE)}
        {searchShow && getIcon(ICON_SEARCH_CANCEL)}
      </LeftAfter>
      <MiddleLeft>
        <LevelCount type="completion" />
      </MiddleLeft>
      <RightBefore rotate={rotate} onClick={showOptionsToggle}>
        {getIcon(ICON_OPTIONS_DROPDOWN)}
        {toggleOptions && (
          <OptionsMenu>
            <OptionItem
              title={"Sort Completion"}
              icon={ICON_SORT_OPTION}
              optionType={SORT_GAMES_COMPLETION}
              optionClickHandler={optionClickHandler}
            />
            <OptionItem
              title={"Sort A - Z"}
              icon={ICON_SORT_OPTION}
              optionType={SORT_GAMES_NAMES_AZ}
              optionClickHandler={optionClickHandler}
            />
            <OptionItem
              title={"Sort Z - A"}
              icon={ICON_SORT_OPTION}
              optionType={SORT_GAMES_NAMES_ZA}
              optionClickHandler={optionClickHandler}
            />
            <CloseButton onClick={showOptionsToggle}>
              {getIcon(ICON_OPTIONS_CLOSE)}
            </CloseButton>
          </OptionsMenu>
        )}
      </RightBefore>
      <Right rotate={rotate} onClick={refreshClickHandler}>
        {getIcon(ICON_REFRESH)}
      </Right>
    </Container>
  );
}
