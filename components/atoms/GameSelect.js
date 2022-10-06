import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import {
  gamesPageSearchTerm,
  gamesPageSelectGame,
} from "../../store/actions/settings.actions";
import Searchbar from "./Searchbar";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
`;

const SelectDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-width: 67.5vw;
  max-width: 67.5vw;
  overflow: scroll;
  margin-bottom: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 2px;
`;

const GameImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 200px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 100px;
  max-height: 100px;
`;

const GameTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 0rem 0.25rem;
  color: #fefefe;
`;

export default function GameSelect() {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId, searchTerm } = gamesPageSettings;

  const selectedGame =
    games.find((game) => game.id === selectedGameId) ?? games[0];

  const filterGamesWithoutSelectedGame = games.filter((game) =>
    game.name
      .toLowerCase()
      .trim()
      .includes((searchTerm ?? "").toLowerCase().trim())
  );

  const searchTermHandler = (searchData) => {
    dispatch(gamesPageSearchTerm(searchData));
  };

  return (
    <Container>
      <SearchBarContainer>
        <Searchbar onSearchObtained={searchTermHandler} width="57.5vw" />
      </SearchBarContainer>
      {searchTerm === "" && (
        <SelectDrop>
          <GameImage
            image={HEADER_IMAGE(selectedGame?.id ?? games[0]?.id ?? "")}
          ></GameImage>
          <GameTitle>{selectedGame?.name ?? games[0]?.name ?? ""}</GameTitle>
        </SelectDrop>
      )}
      {searchTerm !== "" && (
        <SelectDrop>
          <GameImage
            image={HEADER_IMAGE(filterGamesWithoutSelectedGame[0]?.id ?? "")}
          ></GameImage>
          <GameTitle>{filterGamesWithoutSelectedGame[0]?.name ?? ""}</GameTitle>
        </SelectDrop>
      )}
    </Container>
  );
}
