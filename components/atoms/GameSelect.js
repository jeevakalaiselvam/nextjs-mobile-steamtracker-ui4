import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_GAME_SELECT,
  COLOR_GAME_SELECT_OPTION,
  DARK_BACKGROUND,
  getColor,
} from "../../helper/colorHelper";
import { HEADER_IMAGE } from "../../helper/urlHelper";

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
  margin-bottom: 4px;
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
  margin-bottom: 4px;
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
  margin-bottom: 4px;
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
`;

export default function GameSelect() {
  const [showMenu, setShowMenu] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const { games } = steam;

  useEffect(() => {
    if (games && Object.keys(games).length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <Container>
      <SelectDrop
        onClick={() => {
          setShowMenu((old) => !old);
        }}
      >
        <GameImage>0</GameImage>
        <GameTitle>1</GameTitle>
      </SelectDrop>
      <SelectDropDown>
        {showMenu &&
          games.length > 0 &&
          games.map((game) => {
            return (
              <SelectInner>
                <GameImage image={HEADER_IMAGE(game.id)}></GameImage>
                <GameTitle>{game.name}</GameTitle>
              </SelectInner>
            );
          })}
      </SelectDropDown>
    </Container>
  );
}
