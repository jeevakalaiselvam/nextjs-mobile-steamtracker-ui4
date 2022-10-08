import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_REFRESH_ACTIVE,
  COLOR_TEXT_DULL,
  COLOR_TEXT_DULL_BRIGHT,
  getColor,
} from "../../helper/colorHelper";
import { getIcon, ICON_HIDDEN, ICON_PERCENTAGE } from "../../helper/iconHelper";
import { setHiddenRequestsOngoing } from "../../store/actions/steam.actions";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-height: 60px;
  max-height: 60px;
  min-width: 60px;
  max-width: 60px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  opacity: ${(props) =>
    props.toggleCompleted && props.achieved ? "0.15" : "1"};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 55px;
  height: 55px;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
`;

export default function AchievementCardIcon({
  achievement,
  gameId,
  toggleCompleted,
  showHiddenByDefault,
  clickDetectedHandler = (f) => f,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games, hiddenAchievements, hiddenRequestsOngoing } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  const {
    achieved,
    description,
    hiddenDescription,
    displayName,
    hidden,
    icon,
    icongray,
    name,
    percentage,
    unlocktime,
    gameName,
  } = achievement;

  const [showHiddenDesc, setShowHiddenDesc] = useState(showHiddenByDefault);

  const showHiddenDescription = () => {
    setShowHiddenDesc((old) => true);
  };

  const getHiddenDescription = () => {
    if (gameId && hiddenAchievements[gameId]) {
      return hiddenAchievements[gameId][displayName.trim().toLowerCase()];
    } else {
      return "HIDDEN";
    }
  };

  return (
    <Container
      toggleCompleted={toggleCompleted}
      achieved={achieved == "1" ? true : false}
    >
      <Icon src={icon} onClick={() => clickDetectedHandler(achievement)}></Icon>
    </Container>
  );
}
