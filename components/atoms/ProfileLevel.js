import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GOLD_TROPHY,
  COLOR_TEXT_DULL_BRIGHT,
  getColor,
} from "../../helper/colorHelper";
import { getIcon, ICON_MEDAL } from "../../helper/iconHelper";
import { LEVEL_MODIFIER } from "../../helper/storageHelper";
import {
  getDefaultLevelPreference,
  getXPDetailsForAllGames,
} from "../../helper/xpHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-width: 67.5vw;
  max-width: 67.5vw;
  overflow: hidden;
  background-color: cyan;
  margin-top: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL_BRIGHT)};
`;

const Data = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
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
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

const LevelUp = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
`;

export default function ProfileLevel() {
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

  return (
    <Container>
      <Title>Profile Level</Title>
      <Data>
        <LevelIcon>{getIcon(ICON_MEDAL)}</LevelIcon>
        <LevelData>{currentLevel}</LevelData>
        <LevelUp>{xpRequiredForLevelUp}</LevelUp>
      </Data>
    </Container>
  );
}