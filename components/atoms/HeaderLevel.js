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
  ICON_XP,
  ICON_XP_COMPLETED,
} from "../../helper/iconHelper";
import {
  getXPDetailsForAllGames,
  getXPForAchievement,
} from "../../helper/xpHelper";

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

const HeaderMiddle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 1rem;
  margin-left: 1rem;
  font-size: 2.5rem;
  color: ${(props) => getColor(COLOR_XBOX)};
`;

const LevelData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2.5rem;
  color: ${(props) => getColor(COLOR_XBOX)};
  margin-right: 0.5rem;
`;

const CountData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2rem;
  color: ${(props) => getColor(COLOR_XBOX)};
`;

const Obtained = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.25rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  margin-right: 0.25rem;
`;

const MoreNeeded = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.25rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  margin-left: 0.25rem;
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
  transform: rotate(180deg);
`;

const IconXP = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-right: 0.5rem;
  justify-content: center;
  font-size: 1.5rem;
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
  let totalXPInCurrentGame = 0;

  if (gameId) {
    game = games.find((game) => game.id == gameId);
    if (game.achievements.length > 0) {
      totalXPInCurrentGame = game.achievements.reduce((acc, ach) => {
        return acc + ach.achieved === 1
          ? getXPForAchievement(ach.percentage)
          : 0;
      }, 0);
    }
  } else {
    totalXPInCurrentGame = 0;
    if (games) {
      games.forEach((game) => {
        totalXPInCurrentGame =
          totalXPInCurrentGame +
          game.achievements.reduce((acc, ach) => {
            return (
              acc +
              (ach.achieved === 1 ? getXPForAchievement(ach.percentage) : 0)
            );
          }, 0);
      });
    }
  }

  return (
    <Container>
      {gameId && false && (
        <TrophyData>
          <IconNotTransformed>{getIcon(ICON_TROPHY)}</IconNotTransformed>{" "}
          {(game?.achievements?.length ?? 0) - (game?.toGet ?? 0)} /{" "}
          {game?.achievements?.length ?? 0}
        </TrophyData>
      )}
      <Obtained noMargin={true}>
        <IconXP>{getIcon(ICON_XP_COMPLETED)}</IconXP> {totalXPInCurrentGame}
      </Obtained>
      <HeaderMiddle>
        <LevelData>{getIcon(ICON_MEDAL)}</LevelData>
        <CountData>{currentLevel}</CountData>
      </HeaderMiddle>
      <MoreNeeded noMargin={true}>
        {xpRequiredForLevelUp} <Icon>{getIcon(ICON_LEVEL_UP)}</Icon>
      </MoreNeeded>
    </Container>
  );
}
