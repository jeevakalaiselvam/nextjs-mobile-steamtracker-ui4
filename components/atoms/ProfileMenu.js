import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GOLD_TROPHY,
  COLOR_TEXT_DULL,
  COLOR_TEXT_DULL_BRIGHT,
  getColor,
} from "../../helper/colorHelper";
import {
  getIcon,
  ICON_GAMES,
  ICON_MEDAL,
  ICON_SETTINGS,
} from "../../helper/iconHelper";
import { LEVEL_MODIFIER } from "../../helper/storageHelper";
import {
  getDefaultLevelPreference,
  getXPDetailsForAllGames,
} from "../../helper/xpHelper";
import { gamePageDrawerToggle } from "../../store/actions/settings.actions";
import MenuItem from "./MenuItem";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-width: 75vw;
  max-width: 67.5vw;
  overflow: hidden;
  background-color: cyan;
  margin-top: 0.25rem;
  background-color: #1b1c1e;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  background-color: #161718;
`;

const Data = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const LevelIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding: 0.25rem 0.5rem;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

const LevelData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 1.5rem;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

const LevelUp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 1.25rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

export default function ProfileMenu() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  const {
    obtainedXPFromAllGames,
    totalXPFromAllGames,
    currentLevel,
    xpRequiredForLevelUp,
  } = getXPDetailsForAllGames(games);

  const menuClickHandler = (to) => {
    dispatch(gamePageDrawerToggle(false));
    router.push(to);
  };

  return (
    <Container>
      <Data>
        <MenuItem
          to="/games"
          title="Games"
          icon={ICON_GAMES}
          menuClickHandler={menuClickHandler}
        />
        <MenuItem
          to="/settings"
          title="Settings"
          icon={ICON_SETTINGS}
          menuClickHandler={menuClickHandler}
        />
      </Data>
    </Container>
  );
}
