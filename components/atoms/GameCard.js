import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLOR_TEXT_DULL, getColor } from "../../helper/colorHelper";
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
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-width: 100%;
  max-width: 100%;
  min-height: 125px;
  max-height: 125px;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  min-width: 100vw;
  max-width: 100vw;
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

  return (
    <Container>
      <Image image={HEADER_IMAGE(game.id)}></Image>
      <Name>{game.name}</Name>
    </Container>
  );
}
