import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAchievementsSortedByUserOptions } from "../../../helper/achievementHelper";
import { setHiddenAchievementsForGame } from "../../../store/actions/steam.actions";
import AchievementCard from "../../atoms/AchievementCard";
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
`;
const AchievementList = styled.div`
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
`;

export default function GameContent({ gameId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamePageSettings } = settings;
  const { selectedGameId, searchShow, toggleCompleted, sortOption } =
    gamePageSettings;

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (search) => {
    setSearchTerm((old) => search.toLowerCase().trim());
  };

  const selectedGame = games.find((game) => game.id == gameId);
  const allAchievements = selectedGame?.achievements ?? [];

  const searchFilteredAchievements = allAchievements.filter((achievement) =>
    achievement.name.toLowerCase().trim().includes(searchTerm)
  );

  let sortFilteredAchievements = searchFilteredAchievements.sort(
    (achievement1, achievement2) => {
      return Number(achievement2.percentage) - Number(achievement1.percentage);
    }
  );

  let sortOptionUserOptionFiltered = getAchievementsSortedByUserOptions(
    sortFilteredAchievements,
    sortOption
  );

  //Get All Hidden Data
  useEffect(() => {
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
    };
    if (selectedGame && !selectedGame.hiddenAchievements) {
      getHidden();
    }
  }, [gameId]);

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
      <AchievementList searchShow={searchShow}>
        {sortOptionUserOptionFiltered.length > 0 &&
          sortOptionUserOptionFiltered.map((achievement) => {
            return (
              <AchievementCard
                key={achievement.name}
                toggleCompleted={toggleCompleted}
                achievement={achievement}
                gameId={gameId}
              />
            );
          })}
      </AchievementList>
    </Container>
  );
}
