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
import {
  getIcon,
  ICON_HIDDEN,
  ICON_PERCENTAGE,
  ICON_XP,
} from "../../helper/iconHelper";
import { getXPForAchievement } from "../../helper/xpHelper";
import { setHiddenRequestsOngoing } from "../../store/actions/steam.actions";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100%;
  max-width: 100%;
  min-height: 110px;
  max-height: 110px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0.25rem;
  opacity: ${(props) =>
    props.toggleCompleted && props.achieved ? "0.2" : "1"};
`;

const TopWrapper = styled.div`
  display: flex;
  padding: 1rem 0rem 0.5rem 0rem;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  min-height: 80px;
  max-height: 80px;
  justify-content: center;
  position: relative;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  min-height: 25px;
  max-height: 25px;
  justify-content: center;
  position: relative;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 60px;
  flex: 1;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  color: ${(props) => getColor(COLOR_TEXT_DULL_BRIGHT)};
  padding-left: 0.5rem;
`;

const Desc = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
  flex: 1;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

const Hidden = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  color: ${(props) => getColor(COLOR_TEXT_DULL_BRIGHT)};
  padding-left: 0.5rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.5rem;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_REFRESH_ACTIVE)};
  }
`;

const XPDetails = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  color: ${(props) => getColor(COLOR_TEXT_DULL_BRIGHT)};
  padding-left: 0.5rem;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_REFRESH_ACTIVE)};
  }
`;

const XPIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.25rem;
`;

const XPData = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.25rem;
  font-size: 1.5rem;
`;

const Percentage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  color: ${(props) => getColor(COLOR_TEXT_DULL_BRIGHT)};
  padding-left: 0.5rem;
  position: absolute;
  bottom: 1rem;
  left: 0.5rem;
  font-size: 2rem;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_REFRESH_ACTIVE)};
  }
`;

const PercentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  margin-right: 0.5rem;
`;

const PercentNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.37rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

export default function AchievementCard({
  achievement,
  gameId,
  toggleCompleted,
  showHiddenByDefault,
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
    console.log("SETTING");
    setShowHiddenDesc((old) => true);
  };

  const getHiddenDescription = () => {
    console.log("HIDDEN");
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
      <TopWrapper>
        <Icon src={icon}></Icon>
        <Data>
          <Title
            onClick={() => {
              if (window !== "undefined") {
                const searchQuery = `${displayName} achievement ${gameName} `;
                window.open(`https://www.google.com/search?q=${searchQuery}`);
                // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
              }
            }}
          >
            {displayName}
          </Title>
          {hidden === 1 && !showHiddenDesc && <Desc>HIDDEN</Desc>}
          {hidden === 1 && showHiddenDesc && (
            <Desc>
              {getHiddenDescription().length > 80
                ? getHiddenDescription().slice(0, 80) + ".."
                : getHiddenDescription()}
            </Desc>
          )}
          {hidden !== 1 && (
            <Desc>
              {description.length > 80
                ? description.slice(0, 80) + ".."
                : description}
            </Desc>
          )}
        </Data>
        <XPDetails>
          <XPIcon>{getIcon(ICON_XP)}</XPIcon>
          <XPData>{getXPForAchievement(percentage)}</XPData>
        </XPDetails>
      </TopWrapper>
      <BottomWrapper>
        {hidden === 1 && (
          <Hidden onClick={showHiddenDescription}>
            {getIcon(ICON_HIDDEN)}
          </Hidden>
        )}
        <Percentage>
          <PercentIcon>{getIcon(ICON_PERCENTAGE)}</PercentIcon>
          <PercentNumber>{percentage.toFixed(2)} %</PercentNumber>
        </Percentage>
        <Percentage>
          <PercentIcon>{getIcon(ICON_PERCENTAGE)}</PercentIcon>
          <PercentNumber>{percentage.toFixed(2)} %</PercentNumber>
        </Percentage>
      </BottomWrapper>
    </Container>
  );
}
