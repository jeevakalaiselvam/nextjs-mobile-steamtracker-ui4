import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getColor } from "../../helper/colorHelper";
import {
  COLOR_DARK_TRANSPARENT2,
  COLOR_DARK_TRANSPARENT3,
  COLOR_DARK_TRANSPARENT4,
} from "../../helper/constantHelper";
import { HEADER_IMAGE } from "../../helper/urlHelper";
import GamesHeader from "./header/GamesHeader";
import GamesLeft from "./leftside/GamesLeft";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  background: url(${(props) => props.background});
  background-size: cover;
  background-repeat: no-repeat;
`;

const BackdropContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  background-color: ${(props) => getColor(COLOR_DARK_TRANSPARENT4)};
  backdrop-filter: blur(20px);
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 8vh;
  max-height: 8vh;
  min-width: 100vw;
  max-width: 100vw;
  background-color: ${(props) => getColor(COLOR_DARK_TRANSPARENT2)};
  backdrop-filter: blur(20px);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 100vw;
  max-width: 100vw;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 80vw;
  max-width: 80vw;
  background-color: ${(props) => getColor(COLOR_DARK_TRANSPARENT3)};
  position: absolute;
  top: 0;
  left: ${(props) => (props.active ? "0" : "-80vw")};
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 80vw;
  max-width: 80vw;
  background-color: ${(props) => getColor(COLOR_DARK_TRANSPARENT3)};
  position: absolute;
  top: 0;
  right: ${(props) => (props.active ? "0" : "80vw")};
`;

export default function GamesPage() {
  const router = useRouter();
  const steam = useSelector((state) => state.steam);
  const menu = useSelector((state) => state.menu);
  const { games } = steam;
  const { gamesPageMenu } = menu;
  const { left, right } = gamesPageMenu;

  useEffect(() => {
    if (!Object.keys(games).length > 0) {
      router.push("/");
    }
  }, []);

  const getRandomGameId = () => {
    // return games[Math.floor(Math.random() * games.length)]?.id ?? "1151640";
    return "1151640";
  };

  return (
    <Container background={HEADER_IMAGE(getRandomGameId())}>
      <BackdropContainer>
        <Header>
          <GamesHeader />
        </Header>
        <Content></Content>
        <LeftContainer active={left}>
          <GamesLeft />
        </LeftContainer>
        {/* <RightContainer active={right}></RightContainer> */}
      </BackdropContainer>
    </Container>
  );
}
