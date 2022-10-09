import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TbFileVector } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GOLD_TROPHY,
  COLOR_PLATINUM_TROPHY,
  COLOR_TEXT_DULL,
  COLOR_XBOX,
  getColor,
} from "../../helper/colorHelper";
import {
  getIcon,
  ICON_LEVEL_UP,
  ICON_MEDAL,
  ICON_TROPHY,
} from "../../helper/iconHelper";
import { getXPDetailsForAllGames } from "../../helper/xpHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 2.5rem;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.75rem;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

const LevelData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.75rem;
  margin-left: 1rem;
  font-size: 2.5rem;
  color: ${(props) => getColor(COLOR_XBOX)};
`;

const CountData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2rem;
  color: ${(props) => getColor(COLOR_XBOX)};
  margin-right: 1rem;
`;

const MoreNeeded = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.25rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  margin-left: ${(props) => (props.noMargin ? "0.5rem" : "0rem")};
`;

const TrophyData = styled.div`
  display: ${(props) => (props.hide ? "none" : "flex")};
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.25rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  margin-right: 0.5rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  transform: rotate(180deg);
`;

const IconNotTransformed = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  margin-right: 0.5rem;
`;

export default function LevelCount({ type }) {
  const router = useRouter();
  const { gameId } = router.query;
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

  let game = {};

  if (gameId) {
    game = games.find((game) => game.id == gameId);
  }

  return (
    <Container>
      {gameId && (
        <TrophyData>
          <IconNotTransformed>{getIcon(ICON_TROPHY)}</IconNotTransformed>{" "}
          {(game?.achievements?.length ?? 0) - (game?.toGet ?? 0)} /{" "}
          {game?.achievements?.length ?? 0}
        </TrophyData>
      )}
      <LevelData>{getIcon(ICON_MEDAL)}</LevelData>
      <CountData>{currentLevel}</CountData>
      <MoreNeeded noMargin={!!gameId}>
        {xpRequiredForLevelUp} <Icon>{getIcon(ICON_LEVEL_UP)}</Icon>
      </MoreNeeded>
    </Container>
  );
}
