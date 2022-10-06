import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GameCard from "../../atoms/GameCard";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100vw;
  max-width: 100vw;
  height: calc(100vh - 55px);
  overflow: scroll;
  padding: 0.5rem;
`;

export default function GamesContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  return (
    <Container>
      {games.length > 0 &&
        games.map((game) => {
          return <GameCard game={game} key={game.id} />;
        })}
    </Container>
  );
}
