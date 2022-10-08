import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { calculateRecentHistory } from "../../helper/achievementHelper";
import {
  COLOR_ACCENT,
  COLOR_GOLD_TROPHY,
  COLOR_TEXT_DULL,
  COLOR_TEXT_DULL_BRIGHT,
  getColor,
} from "../../helper/colorHelper";
import { getIcon, ICON_MEDAL, ICON_TROPHY } from "../../helper/iconHelper";
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
  min-width: 75vw;
  max-width: 75vw;
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

const HistoryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0.25rem;
  overflow: scroll;
`;

const HistoryItem = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  align-items: center;
  margin: 0.5rem;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${(props) => (props.current ? "#151517" : "#101114")};
  color: ${(props) => (props.current ? "#fefefe" : "#737c9d")};
  opacity: ${(props) => (props.transparent ? "0.25" : "1.0")};
  &:hover,
  &:active {
    background-color: ${(props) => getColor(COLOR_ACCENT)};
    color: ${(props) => getColor(COLOR_TEXT_DULL_BRIGHT)};
  }
`;

export default function ProfileHistory() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  const { recentHistory } = calculateRecentHistory(games);

  const historyDayClicked = (achievements) => {
    // dispatch(setShowHistoryModal(achievements));
  };

  return (
    <Container>
      <Title>Recent History</Title>
      <Data>
        <HistoryContainer>
          {Object.keys(recentHistory).map((key, index) => {
            return (
              <HistoryItem
                transparent={recentHistory[key].length == 0}
                key={index}
                id={index}
                current={false}
                onClick={() => {
                  historyDayClicked(
                    recentHistory[key] ?? 0,
                    recentHistory[key][0]?.unlocktime ?? ""
                  );
                }}
              >
                {recentHistory[key].length}
              </HistoryItem>
            );
          })}
        </HistoryContainer>
      </Data>
    </Container>
  );
}
