import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_ACCENT,
  COLOR_REFRESH_ACTIVE,
  COLOR_REFRESH_INACTIVE,
  COLOR_TEXT_DRAWER_ICON,
  COLOR_TEXT_DULL,
  getColor,
} from "../../helper/colorHelper";
import {
  getIcon,
  ICON_CLOSE,
  ICON_COMPLETED_TOGGLE_ACTIVE,
  ICON_COMPLETED_TOGGLE_DISABLED,
  ICON_GAMES,
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
  GAME_VIEW_TYPE_ICON,
  GAME_VIEW_TYPE_LARGE,
  GAME_VIEW_TYPE_SMALL,
  SORT_ACHIEVEMENTS_ALL,
  SORT_ACHIEVEMENTS_LOCKED,
  SORT_ACHIEVEMENTS_UNLOCKED,
} from "../../helper/sortHelper";
import {
  gamePageToggleCompleted,
  gamePageDrawerToggle,
  gamePageSearchShow,
  gamePageToggleOptions,
  gamePageSortOptions,
  gamePageDrawerHistoryToggle,
  gamePageViewType,
} from "../../store/actions/settings.actions";
import { gamePageRefreshGameData } from "../../store/actions/steam.actions";
import HeaderLevel from "../atoms/HeaderLevel";
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
  background-color: #101114;
  padding-left: 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  font-size: 2.5rem;
  padding: 4px;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const MiddleLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  flex: 1;
  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const MiddleRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  flex: 1;
  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
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
  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
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
  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
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
  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }

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
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #101114;
  z-index: 1000;
`;

const CloseButton = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export default function GameHeader({ gameId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games, hiddenAchievements } = steam;
  const { gamePageSettings } = settings;
  const { drawerOpen, searchShow, toggleCompleted, toggleOptions } =
    gamePageSettings;

  const [rotate, setRotate] = useState(false);

  const menuClickHandler = () => {
    dispatch(gamePageDrawerToggle(!drawerOpen));
  };

  const refreshClickHandler = async () => {
    setRotate((old) => true);

    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
    };

    if (!hiddenAchievements[gameId]) {
      getHidden();
    }

    const response = await axios.get(`/api/refresh/${gameId}`);
    const gameRefreshData = response.data.data;
    setRotate((old) => false);
    dispatch(gamePageRefreshGameData(gameId, gameRefreshData));
    dispatch(gamePageDrawerHistoryToggle(true));
  };

  const searchClickHandler = () => {
    dispatch(gamePageSearchShow(!searchShow));
  };

  const completedToggleClickHandler = () => {
    dispatch(gamePageToggleCompleted(!toggleCompleted));
  };

  const showOptionsToggle = () => {
    dispatch(gamePageToggleOptions(!toggleOptions));
  };

  const optionClickHandler = (sortType) => {
    dispatch(gamePageSortOptions(sortType));
  };

  const viewTypeClickHandler = (viewType) => {
    dispatch(gamePageViewType(viewType));
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
        <HeaderLevel type="completion" />
      </MiddleLeft>
      <RightBefore rotate={rotate} onClick={showOptionsToggle}>
        {getIcon(ICON_OPTIONS_DROPDOWN)}
        {toggleOptions && (
          <OptionsMenu>
            <OptionItem
              title={"SORT BY: ALL"}
              icon={ICON_SORT_OPTION}
              optionType={SORT_ACHIEVEMENTS_ALL}
              optionClickHandler={optionClickHandler}
            />
            <OptionItem
              title={"SORT BY: LOCKED"}
              icon={ICON_SORT_OPTION}
              optionType={SORT_ACHIEVEMENTS_LOCKED}
              optionClickHandler={optionClickHandler}
            />
            <OptionItem
              title={"SORT BY: UNLOCKED"}
              icon={ICON_SORT_OPTION}
              optionType={SORT_ACHIEVEMENTS_UNLOCKED}
              optionClickHandler={optionClickHandler}
            />
            <OptionItem
              title={"VIEW BY: LARGE"}
              icon={ICON_SORT_OPTION}
              optionType={GAME_VIEW_TYPE_LARGE}
              optionClickHandler={viewTypeClickHandler}
            />
            <OptionItem
              title={"VIEW BY: SMALL"}
              icon={ICON_SORT_OPTION}
              optionType={GAME_VIEW_TYPE_SMALL}
              optionClickHandler={viewTypeClickHandler}
            />
            <OptionItem
              title={"VIEW BY: ICON"}
              icon={ICON_SORT_OPTION}
              optionType={GAME_VIEW_TYPE_ICON}
              optionClickHandler={viewTypeClickHandler}
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
