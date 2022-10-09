import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllAchievementsForAllGames,
  getAllAchievementsUnlockedByType,
  getAllAchievementsUnlockedToday,
} from "../../../helper/achievementHelper";
import {
  COLOR_ACCENT,
  COLOR_CLOSE_RED,
  COLOR_TEXT_DULL,
  getColor,
} from "../../../helper/colorHelper";
import {
  getIcon,
  ICON_DRAWER_CLOSE,
  ICON_THEME_SWITCH,
} from "../../../helper/iconHelper";
import {
  RECENT_TYPE_MONTH,
  RECENT_TYPE_TODAY,
  RECENT_TYPE_WEEK,
  RECENT_TYPE_YEAR,
} from "../../../helper/sortHelper";
import {
  READ_JSON,
  SELECTED_THEME_ID,
  WRITE_JSON,
} from "../../../helper/storageHelper";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import {
  gamePageDrawerHistoryToggle,
  gamePageSwitchRecentType,
} from "../../../store/actions/settings.actions";
import { setHiddenAchievementsForGame } from "../../../store/actions/steam.actions";
import AchievementCard from "../../atoms/AchievementCard";
import AchievementCardSidebar from "../../atoms/AchievementCardSidebar";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  background-color: #101114;
  z-index: 1000;
`;

const Close = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;
  z-index: 5;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const Theme = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;
  z-index: 5;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const CloseBottom = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;
  z-index: 5;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const ThemeBottom = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
  font-size: 2.5rem;
  padding: 1rem;
  z-index: 5;

  &:hover,
  &:active {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const AchievementList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 90vh;
  max-height: 90vh;
  overflow: scroll;
  padding: 4rem 0.25rem 4rem 0.25rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 32vw;
  top: 1.25rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

export default function GamePageHistoryLeft({ gameId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games, hiddenAchievements } = steam;
  const { gamePageSettings } = settings;
  const { selectedGameId, recentType } = gamePageSettings;

  const closeClickHandler = () => {
    dispatch(gamePageDrawerHistoryToggle(false));
  };

  const themeRefreshClickHandler = () => {
    let newGameId =
      games[Math.floor(Math.random() * games.length)].id ?? "1151640";
    WRITE_JSON(SELECTED_THEME_ID, newGameId);
    dispatch(gamePageDrawerHistoryToggle(false));
  };

  const getStoredThemeId = () => {
    const storedId = READ_JSON(SELECTED_THEME_ID, "1151640");
    return storedId;
  };

  const allAchievements = getAllAchievementsForAllGames(games);
  const allAchievementsUnlockedByType = getAllAchievementsUnlockedByType(
    recentType,
    allAchievements
  );

  let sortFilteredAchievements = allAchievementsUnlockedByType.sort(
    (achievement1, achievement2) => {
      return Number(achievement2.unlocktime) - Number(achievement1.unlocktime);
    }
  );

  const allGamesFromAchievements = allAchievementsUnlockedByType.map(
    (achievement) => achievement.gameId
  );
  const allUniqueGames = new Set(allGamesFromAchievements);

  //Get Hidden Achievements if not present for games
  allUniqueGames.forEach((gameId) => {
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
    };

    if (!hiddenAchievements[gameId] && gameId) {
      getHidden();
    }
  });

  const toggleRecent = () => {
    if (recentType == RECENT_TYPE_TODAY) {
      dispatch(gamePageSwitchRecentType(RECENT_TYPE_WEEK));
    } else if (recentType == RECENT_TYPE_WEEK) {
      dispatch(gamePageSwitchRecentType(RECENT_TYPE_MONTH));
    } else if (recentType == RECENT_TYPE_MONTH) {
      dispatch(gamePageSwitchRecentType(RECENT_TYPE_YEAR));
    } else {
      dispatch(gamePageSwitchRecentType(RECENT_TYPE_TODAY));
    }
  };

  const getTitle = (recentType) => {
    if (recentType == RECENT_TYPE_TODAY) {
      return "Unlocked Today";
    } else if (recentType == RECENT_TYPE_WEEK) {
      return "Unlocked Week";
    } else if (recentType == RECENT_TYPE_MONTH) {
      return "Unlocked Month";
    } else {
      return "Unlocked Year";
    }
  };

  return (
    <Container image={HEADER_IMAGE(getStoredThemeId())}>
      <Title onClick={toggleRecent}>{getTitle(recentType)}</Title>
      <Theme onClick={themeRefreshClickHandler}>
        {getIcon(ICON_THEME_SWITCH)}
      </Theme>
      <Close onClick={closeClickHandler}>{getIcon(ICON_DRAWER_CLOSE)}</Close>
      <ThemeBottom onClick={themeRefreshClickHandler}>
        {getIcon(ICON_THEME_SWITCH)}
      </ThemeBottom>
      <CloseBottom onClick={closeClickHandler}>
        {getIcon(ICON_DRAWER_CLOSE)}
      </CloseBottom>
      <AchievementList searchShow={false}>
        {sortFilteredAchievements.length > 0 &&
          sortFilteredAchievements.map((achievement) => {
            return (
              <AchievementCardSidebar
                key={achievement.name}
                toggleCompleted={false}
                achievement={achievement}
                showHiddenByDefault={true}
                gameId={achievement.gameId}
              />
            );
          })}
      </AchievementList>
    </Container>
  );
}
