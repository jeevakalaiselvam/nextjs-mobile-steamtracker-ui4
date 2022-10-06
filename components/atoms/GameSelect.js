import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import { gamesPageSelectGame } from "../../store/actions/settings.actions";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
`;

const SelectDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 80px;
  max-height: 80px;
  overflow: scroll;
  margin-bottom: 2px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SelectDropDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  max-height: calc(100vh - 100px);
  overflow: scroll;
  margin-bottom: 2px;
`;

const SelectInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 80px;
  max-height: 80px;
  overflow: scroll;
  margin-bottom: 2px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const GameImage = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  flex-direction: row;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 80px;
  max-height: 80px;
`;

const GameTitle = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  min-height: 80px;
  max-height: 80px;
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
  const { selectedGameId } = gamesPageSettings;

  useEffect(() => {
    if (games && Object.keys(games).length === 0) {
      router.push("/");
    }
  }, []);

  const selectedGame =
    games.find((game) => game.id === selectedGameId) ?? games[0];

  const filterGamesWithoutSelectedGame = games.filter(
    (game) => game.id != (selectedGame?.id ?? "")
  );

  const gameSelectHandler = (gameId) => {
    dispatch(gamesPageSelectGame(gameId));
    setShowMenu((old) => false);
  };

  return (
    <Container>
      <SelectDrop
        onClick={() => {
          setShowMenu((old) => !old);
        }}
      >
        <GameImage
          image={HEADER_IMAGE(selectedGame?.id ?? games[0].id)}
        ></GameImage>
        <GameTitle>{selectedGame?.name ?? games[0].name}</GameTitle>
      </SelectDrop>
      <SelectDropDown>
        {showMenu &&
          filterGamesWithoutSelectedGame.length > 0 &&
          filterGamesWithoutSelectedGame.map((game) => {
            return (
              <SelectInner
                onClick={() => {
                  gameSelectHandler(game.id);
                }}
              >
                <GameImage image={HEADER_IMAGE(game.id)}></GameImage>
                <GameTitle>{game.name}</GameTitle>
              </SelectInner>
            );
          })}
      </SelectDropDown>
    </Container>
  );
}
