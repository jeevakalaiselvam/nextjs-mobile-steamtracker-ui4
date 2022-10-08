import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { READ_JSON, SELECTED_THEME_ID } from "../../../helper/storageHelper";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import GamesHeader from "../../molecules/GamesHeader";
import GamesContent from "../content/GamesContent";
import GamesPageLeft from "../left/GamesPageLeft";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const BackDrop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #101114;
`;

const LeftContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  position: absolute;
  min-width: 75vw;
  max-width: 75vw;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: ${(props) => (props.open ? "-1vw" : "-75vw")};
  transition: all 0.5s;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 55px;
  min-height: 55px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  flex: 1;
  min-height: 55px;
  min-height: 55px;
`;

export default function GamesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId, drawerOpen } = gamesPageSettings;

  const getStoredThemeId = () => {
    const storedId = READ_JSON(SELECTED_THEME_ID, "1151640");
    return storedId;
  };

  return (
    <Container image={HEADER_IMAGE(getStoredThemeId())}>
      <BackDrop>
        <LeftContainer
          open={drawerOpen}
          image={HEADER_IMAGE(getStoredThemeId())}
        >
          <GamesPageLeft />
        </LeftContainer>
        <HeaderContainer>
          <GamesHeader />
        </HeaderContainer>
        <ContentContainer>
          <GamesContent />
        </ContentContainer>
      </BackDrop>
    </Container>
  );
}
