import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAchievementsSortedByUserOptions } from "../../../helper/achievementHelper";
import {
  COLOR_ACCENT,
  COLOR_CLOSE_RED,
  COLOR_TEXT_DULL,
  getColor,
} from "../../../helper/colorHelper";
import {
  getIcon,
  ICON_CLOSE,
  ICON_CLOSE_CIRCLE,
} from "../../../helper/iconHelper";
import {
  GAME_VIEW_TYPE_ICON,
  GAME_VIEW_TYPE_LARGE,
  GAME_VIEW_TYPE_SMALL,
  SORT_ACHIEVEMENTS_ALL,
} from "../../../helper/sortHelper";
import { setHiddenAchievementsForGame } from "../../../store/actions/steam.actions";
import AchievementCard from "../../atoms/AchievementCard";
import AchievementCardIcon from "../../atoms/AchievementCardIcon";
import AchievementCardSmall from "../../atoms/AchievementCardSmall";
import GameCard from "../../atoms/GameCard";
import Searchbar from "../../atoms/Searchbar";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100vw;
  max-width: 100vw;
  min-height: calc(100vh - 55px);
  max-height: calc(100vh - 55px);
`;

const AchievementSearch = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 40px;
  max-height: 40px;
  margin-top: 0.5rem;
`;
const AchievementListLarge = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${(props) =>
    props.searchShow ? "calc(100vh - 55px - 50px)" : "calc(100vh - 55px)"};
  max-height: ${(props) =>
    props.searchShow ? "calc(100vh - 55px - 50px)" : "calc(100vh - 55px)"};
  overflow: scroll;
  padding: 0 0.25rem 0.5rem 0.25rem;
  background-color: #151517;
`;

const AchievementListIcon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  padding-top: 0.5rem;
  min-height: ${(props) =>
    props.searchShow ? "calc(100vh - 55px - 50px)" : "calc(100vh - 55px)"};
  max-height: ${(props) =>
    props.searchShow ? "calc(100vh - 55px - 50px)" : "calc(100vh - 55px)"};
`;

const AchievementSelected = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100px;
  max-height: 100px;
  background-color: #151517;
`;

const AchievementIcons = styled.div`
  display: flex;
  align-items: flex-start;
  justify-self: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  background-color: #151517;
  overflow: scroll;
`;

export default function GameContent({ gameId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games, hiddenAchievements } = steam;
  const { gamePageSettings } = settings;
  const { selectedGameId, searchShow, toggleCompleted, sortOption, viewType } =
    gamePageSettings;

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (search) => {
    setSearchTerm((old) => search.toLowerCase().trim());
  };

  const selectedGame = games.find((game) => game.id == gameId);
  const allAchievements = selectedGame?.achievements ?? [];

  const hiddenAchievementsForGame = hiddenAchievements[gameId];

  const searchFilteredAchievements = allAchievements.filter((achievement) => {
    return (
      achievement.displayName.toLowerCase().trim().includes(searchTerm) ||
      hiddenAchievementsForGame[achievement.displayName.toLowerCase().trim()]
        .toLowerCase()
        .trim()
        .includes(searchTerm)
    );
  });

  let sortFilteredAchievements = searchFilteredAchievements.sort(
    (achievement1, achievement2) => {
      return Number(achievement2.percentage) - Number(achievement1.percentage);
    }
  );

  let sortOptionUserOptionFiltered = getAchievementsSortedByUserOptions(
    sortFilteredAchievements,
    sortOption
  );

  //Get Hidden Achievements if not present for games
  useEffect(() => {
    if (gameId) {
      const getHidden = async () => {
        const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
        const hiddenData = hiddenResponse.data.hiddenMapper;
        dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
      };

      if (!hiddenAchievements[gameId]) {
        getHidden();
      }
    }
  }, [gameId]);

  const [selectedAchievement, setSelectedAchievement] = useState(
    sortFilteredAchievements[0]
  );

  const clickDetectedHandler = (achievementSelected) => {
    setSelectedAchievement((old) => achievementSelected);
  };

  return (
    <Container>
      {searchShow && (
        <AchievementSearch>
          <Searchbar
            onSearchObtained={searchHandler}
            width="87.5vw"
            searchShow={searchShow}
          />
        </AchievementSearch>
      )}
      {viewType === GAME_VIEW_TYPE_LARGE && (
        <AchievementListLarge searchShow={searchShow}>
          {sortOptionUserOptionFiltered.length > 0 &&
            sortOptionUserOptionFiltered.map((achievement) => {
              return (
                <AchievementCard
                  key={achievement.name}
                  toggleCompleted={
                    sortOption === SORT_ACHIEVEMENTS_ALL
                      ? true
                      : toggleCompleted
                  }
                  achievement={achievement}
                  gameId={achievement.gameId}
                  showHiddenByDefault={true}
                />
              );
            })}
        </AchievementListLarge>
      )}

      {viewType === GAME_VIEW_TYPE_SMALL && (
        <AchievementListLarge searchShow={searchShow}>
          {sortOptionUserOptionFiltered.length > 0 &&
            sortOptionUserOptionFiltered.map((achievement) => {
              return (
                <AchievementCardSmall
                  key={achievement.name}
                  toggleCompleted={
                    sortOption === SORT_ACHIEVEMENTS_ALL
                      ? true
                      : toggleCompleted
                  }
                  achievement={achievement}
                  gameId={achievement.gameId}
                  showHiddenByDefault={true}
                />
              );
            })}
        </AchievementListLarge>
      )}

      {viewType === GAME_VIEW_TYPE_ICON && (
        <AchievementListIcon searchShow={searchShow}>
          {selectedAchievement && (
            <AchievementSelected>
              <AchievementCard
                toggleCompleted={false}
                achievement={selectedAchievement}
                gameId={selectedAchievement.gameId}
                showHiddenByDefault={false}
              />
            </AchievementSelected>
          )}
          <AchievementIcons>
            {sortOptionUserOptionFiltered.length > 0 &&
              sortOptionUserOptionFiltered.map((achievement) => {
                return (
                  <AchievementCardIcon
                    key={achievement.name}
                    toggleCompleted={true}
                    achievement={achievement}
                    gameId={achievement.gameId}
                    showHiddenByDefault={false}
                    clickDetectedHandler={clickDetectedHandler}
                  />
                );
              })}
          </AchievementIcons>
        </AchievementListIcon>
      )}
    </Container>
  );
}
