import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_CLOSE_RED,
  COLOR_GOLD_TROPHY,
  COLOR_TEXT_DULL,
  getColor,
} from "../../../helper/colorHelper";
import {
  getIcon,
  ICON_CLOSE,
  ICON_DRAWER_CLOSE,
  ICON_THEME_SWITCH,
} from "../../../helper/iconHelper";
import {
  READ_JSON,
  SELECTED_THEME_ID,
  WRITE_JSON,
} from "../../../helper/storageHelper";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import { gamePageDrawerToggle } from "../../../store/actions/settings.actions";
import Profile from "../../atoms/Profile";
import ProfileHistory from "../../atoms/ProfileHistory";
import ProfileLevel from "../../atoms/ProfileLevel";
import ProfileMenu from "../../atoms/ProfileMenu";
import ProfileTrophies from "../../atoms/ProfileTrophies";
import GameSelectList from "../../molecules/GameSelectList";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
`;

const Close = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;

  &:hover {
    color: ${(props) => getColor(COLOR_CLOSE_RED)};
  }
`;

const Theme = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;

  &:hover {
    color: ${(props) => getColor(COLOR_CLOSE_RED)};
  }
`;

const CloseBottom = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;

  &:hover {
    color: ${(props) => getColor(COLOR_CLOSE_RED)};
  }
`;

const ThemeBottom = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;

  &:hover {
    color: ${(props) => getColor(COLOR_CLOSE_RED)};
  }
`;

export default function GamePageLeft() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamePageSettings } = settings;
  const { selectedGameId } = gamePageSettings;

  const closeClickHandler = () => {
    dispatch(gamePageDrawerToggle(false));
  };

  const themeRefreshClickHandler = () => {
    let newGameId =
      games[Math.floor(Math.random() * games.length)].id ?? "1151640";
    WRITE_JSON(SELECTED_THEME_ID, newGameId);
    dispatch(gamePageDrawerToggle(false));
  };

  const getStoredThemeId = () => {
    const storedId = READ_JSON(SELECTED_THEME_ID, "1151640");
    return storedId;
  };

  return (
    <Container image={HEADER_IMAGE(getStoredThemeId())}>
      <Theme onClick={themeRefreshClickHandler}>
        {getIcon(ICON_THEME_SWITCH)}
      </Theme>
      <Close onClick={closeClickHandler}>{getIcon(ICON_DRAWER_CLOSE)}</Close>
      <ThemeBottom onClick={themeRefreshClickHandler}>
        {getIcon(ICON_THEME_SWITCH)}
      </ThemeBottom>
      <CloseBottom onClick={closeClickHandler}>
        {getIcon(ICON_DRAWER_CLOSE)}
      </CloseBottom>
      <Profile />
      <ProfileLevel />
      <ProfileTrophies />
      <ProfileHistory />
      <ProfileMenu />
    </Container>
  );
}
