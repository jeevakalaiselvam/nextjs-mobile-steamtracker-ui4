import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GOLD_TROPHY,
  COLOR_PLATINUM_TROPHY,
  getColor,
} from "../../helper/colorHelper";
import { getIcon, ICON_TROPHY } from "../../helper/iconHelper";

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

const TrophyTarget = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 2.5rem;
  color: ${(props) => getColor(COLOR_PLATINUM_TROPHY)};
`;

const CountTarget = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.75rem;
  color: ${(props) => getColor(COLOR_PLATINUM_TROPHY)};
`;

export default function TrophyCount({ type }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  const totalCompleted = games.reduce((acc, game) => acc + game.completed, 0);
  const targetCompleted = games.reduce(
    (acc, game) => acc + (+game.completion > 50 ? 1 : 0),
    0
  );

  return (
    <Container>
      {type === "all" && <TrophyTarget>{getIcon(ICON_TROPHY)}</TrophyTarget>}
      {type === "all" && <CountTarget>{targetCompleted}</CountTarget>}
      {type === "completion" && <Trophy>{getIcon(ICON_TROPHY)}</Trophy>}
      {type === "completion" && <Count>{totalCompleted}</Count>}
    </Container>
  );
}
