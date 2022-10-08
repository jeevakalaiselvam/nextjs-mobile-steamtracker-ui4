import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GOLD_TROPHY,
  COLOR_TEXT_DULL,
  getColor,
} from "../../helper/colorHelper";
import { getIcon, ICON_TROPHY } from "../../helper/iconHelper";
import { HEADER_IMAGE } from "../../helper/urlHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(30px);

  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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

const Trophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5rem;
  color: ${(props) => getColor(COLOR_GOLD_TROPHY)};
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
    router.push(`/games/${game.id}`);
  };

  return (
    <Container onClick={movetoGame}>
      <Image image={HEADER_IMAGE(game.id)}></Image>
      <SubPanel>
        <Name>{game.name}</Name>
        <Stat>
          <TrophyCompletion>
            <Trophy>{getIcon(ICON_TROPHY)}</Trophy>
            <Count>{game.toGet}</Count>
          </TrophyCompletion>
        </Stat>
      </SubPanel>
    </Container>
  );
}
