import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
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
  const { gamesPageSettings } = settings;
  const { selectedGameId, searchShow } = gamesPageSettings;

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (search) => {
    setSearchTerm((old) => search.toLowerCase().trim());
  };

  const selectedGame = games.find((game) => game.id == gameId);
  const allAchievements = selectedGame?.achievements ?? [];

  const searchFilteredAchievements = allAchievements.filter((achievement) =>
    achievement.name.toLowerCase().trim().includes(searchTerm)
  );

  const sortFilteredAchievements = searchFilteredAchievements.sort(
    (achievement1, achievement2) => {
      return Number(achievement2.percentage) - Number(achievement1.percentage);
    }
  );

  //Get All Hidden Data
  useEffect(() => {
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      console.log("HIDDEN", hiddenData);
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
          <Searchbar onSearchObtained={searchHandler} width="87.5vw" />
        </AchievementSearch>
      )}
      {console.log(allAchievements)}
      <AchievementList searchShow={searchShow}>
        {sortFilteredAchievements.length > 0 &&
          sortFilteredAchievements.map((achievement) => {
            return (
              <AchievementCard
                achievement={achievement}
                key={achievement.id}
                gameId={gameId}
              />
            );
          })}
      </AchievementList>
    </Container>
  );
}
