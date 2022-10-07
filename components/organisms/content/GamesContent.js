import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getGamesSortedByUserOptions } from "../../../helper/achievementHelper";
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

const GamesSearch = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 40px;
  max-height: 40px;
`;
const GamesList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  min-height: ${(props) =>
    props.searchShow ? "calc(100vh - 55px - 50px)" : "calc(100vh - 55px)"};
  max-height: ${(props) =>
    props.searchShow ? "calc(100vh - 55px - 50px)" : "calc(100vh - 55px)"};
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
  const { selectedGameId, searchShow, toggleCompleted, sortOption } =
    gamesPageSettings;

  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (search) => {
    setSearchTerm((old) => search.toLowerCase().trim());
  };

  const searchFilteredGames = games.filter((game) =>
    game.name.toLowerCase().trim().includes(searchTerm)
  );

  let sortOptionUserOptionFiltered = getGamesSortedByUserOptions(
    searchFilteredGames,
    sortOption
  );

  return (
    <Container>
      {searchShow && (
        <GamesSearch>
          <Searchbar
            onSearchObtained={searchHandler}
            width="87.5vw"
            searchShow={searchShow}
          />
        </GamesSearch>
      )}
      <GamesList searchShow={searchShow}>
        {sortOptionUserOptionFiltered.length > 0 &&
          sortOptionUserOptionFiltered.map((game) => {
            return <GameCard game={game} key={game.id} />;
          })}
      </GamesList>
    </Container>
  );
}
