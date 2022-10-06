import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_REFRESH_ACTIVE,
  COLOR_REFRESH_INACTIVE,
  getColor,
} from "../../helper/colorHelper";
import {
  getIcon,
  ICON_MENU,
  ICON_REFRESH,
  ICON_SEARCH,
} from "../../helper/iconHelper";
import {
  gamesPageDrawerToggle,
  gamesPageSearchShow,
} from "../../store/actions/settings.actions";
import TrophyCount from "../atoms/TrophyCount";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 55px;
  max-height: 55px;
  overflow: hidden;
  color: #fefefe;
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  padding-left: 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  font-size: 2.5rem;
  padding: 4px;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  flex: 1;
`;

const LeftAfter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 1rem;
  justify-content: center;
  opacity: 0;
  font-size: 2.25rem;
  padding: 4px;
  color: ${(props) =>
    props.rotate
      ? getColor(COLOR_REFRESH_INACTIVE)
      : getColor(COLOR_REFRESH_INACTIVE)};
`;

const RightBefore = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2.25rem;
  padding: 4px;
  margin-right: 1rem;
  color: ${(props) =>
    props.rotate
      ? getColor(COLOR_REFRESH_INACTIVE)
      : getColor(COLOR_REFRESH_INACTIVE)};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 2.25rem;
  padding: 4px;
  color: ${(props) =>
    props.rotate
      ? getColor(COLOR_REFRESH_INACTIVE)
      : getColor(COLOR_REFRESH_INACTIVE)};
  -webkit-animation: ${(props) =>
    props.rotate ? "spin 1s linear infinite" : ""};
  -moz-animation: ${(props) => (props.rotate ? "spin 1s linear infinite" : "")};
  animation: ${(props) => (props.rotate ? "spin 1s linear infinite" : "")};

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default function GamesHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { drawerOpen, searchShow } = gamesPageSettings;

  const [rotate, setRotate] = useState(false);

  const menuClickHandler = () => {
    dispatch(gamesPageDrawerToggle(!drawerOpen));
  };

  const refreshClickHandler = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 2000);
  };

  const searchClickHandler = () => {
    dispatch(gamesPageSearchShow(true));
  };

  return (
    <Container>
      <Left onClick={menuClickHandler}>
        {drawerOpen ? getIcon(ICON_MENU) : getIcon(ICON_MENU)}
      </Left>
      <LeftAfter rotate={rotate} onClick={refreshClickHandler}>
        {getIcon(ICON_SEARCH)}
      </LeftAfter>
      <Middle>
        <TrophyCount />
      </Middle>
      <RightBefore onClick={searchClickHandler}>
        {getIcon(ICON_SEARCH)}
      </RightBefore>
      <Right rotate={rotate} onClick={refreshClickHandler}>
        {getIcon(ICON_REFRESH)}
      </Right>
    </Container>
  );
}
