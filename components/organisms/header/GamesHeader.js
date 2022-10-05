import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor } from "../../../helper/colorHelper";
import {
  COLOR_ACCENT,
  COLOR_GOLD,
  COLOR_LIGHT_TRANSPARENT4,
  ICON_MENU,
  ICON_OPTIONS,
  ICON_TROPHY,
} from "../../../helper/constantHelper";
import { getIcon } from "../../../helper/iconHelper";
import {
  headerLeftGamesOff,
  headerLeftGamesOn,
  headerRightGamesOn,
} from "../../../store/actions/menu.actions";
import Trophy from "../../atoms/Trophy";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  height: 100%;
  max-width: 100vw;
  padding: 0.25rem 0.5rem;
`;

const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 3rem;
  color: ${(props) =>
    props.active ? getColor(COLOR_ACCENT) : getColor(COLOR_LIGHT_TRANSPARENT4)};
  &:hover {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const OptionsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 2.5rem;
  color: ${(props) =>
    props.active ? getColor(COLOR_ACCENT) : getColor(COLOR_LIGHT_TRANSPARENT4)};
  &:hover {
    color: ${(props) => getColor(COLOR_ACCENT)};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function GamesHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const menu = useSelector((state) => state.menu);
  const { games } = steam;
  const { gamesPageMenu } = menu;
  const { left, right } = gamesPageMenu;

  const completed =
    games.length !== 0
      ? games.reduce((acc, game) => {
          return acc + game.completed;
        }, 0)
      : 0;

  const leftIconClickHandler = () => {
    dispatch(headerLeftGamesOn());
  };

  const rightIconClickHandler = () => {
    dispatch(headerRightGamesOn());
  };

  return (
    <Container>
      <MenuIcon onClick={leftIconClickHandler} active={left}>
        {getIcon(ICON_MENU)}
      </MenuIcon>
      <HeaderContent>
        <Trophy
          icon={ICON_TROPHY}
          count={completed}
          size={"2rem"}
          color={COLOR_GOLD}
          isHorizontal={false}
        />
      </HeaderContent>
      <OptionsIcon onClick={rightIconClickHandler} active={right}>
        {getIcon(ICON_OPTIONS)}
      </OptionsIcon>
    </Container>
  );
}
