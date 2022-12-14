import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GOLD_TROPHY,
  COLOR_TEXT_DULL,
  COLOR_TEXT_DULL_TRANSPARENT,
  getColor,
} from "../../helper/colorHelper";
import {
  getIcon,
  ICON_MEDAL,
  ICON_TROPHY,
  ICON_XP,
} from "../../helper/iconHelper";
import {
  READ_JSON,
  SELECT_MAPPER_KEY,
  WRITE_JSON,
} from "../../helper/storageHelper";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import { getXPForAchievement } from "../../helper/xpHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 0.5rem;
  background-color: #1b1c1e;

  &:hover {
    box-shadow: 2px 2px 4px #1b1c1e;
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  min-height: 150px;
  max-height: 150px;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const SubPanel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  min-width: 100vw;
  max-width: 100vw;
  min-height: 40px;
  max-height: 40px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0.5rem;
  flex: 1;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
`;

const TrophyCompletion = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
`;

const XPRemaining = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5rem;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

const XPCount = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  flex: 1;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  flex: 1;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
`;

export default function GameCard({ game }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;
  const { name } = game;

  const movetoGame = () => {
    if (game.id) {
      let oldData = READ_JSON(SELECT_MAPPER_KEY, {});
      let newData = {};
      if (!oldData[game.id]) {
        newData = {
          ...oldData,
          [game.id]: {
            recentClick: new Date().getTime(),
            count: 1,
          },
        };
        WRITE_JSON(SELECT_MAPPER_KEY, newData);
      } else {
        newData = {
          ...oldData,
          [game.id]: {
            count: oldData[game.id].count + 1,
            recentClick: new Date().getTime(),
          },
        };
        WRITE_JSON(SELECT_MAPPER_KEY, newData);
      }
      router.push(`/games/${game.id}`);
    }
  };

  const remainingXP =
    game?.achievements.reduce((acc, achievement) => {
      return (
        Number(acc) +
        (achievement.achieved !== 1
          ? getXPForAchievement(achievement.percentage)
          : 0)
      );
    }, 0) ?? 0;

  return (
    <Container onClick={movetoGame}>
      <Image image={HEADER_IMAGE(game.id)}></Image>
      <SubPanel>
        <Name>{game.name}</Name>
        <Stat>
          {/* <XPRemaining>
            {remainingXP !== 0 && <XPCount>+{remainingXP}</XPCount>}
          </XPRemaining> */}
          <TrophyCompletion>
            <Trophy>{getIcon(ICON_MEDAL)}</Trophy>
            <Count>{remainingXP}</Count>
          </TrophyCompletion>
        </Stat>
      </SubPanel>
    </Container>
  );
}
