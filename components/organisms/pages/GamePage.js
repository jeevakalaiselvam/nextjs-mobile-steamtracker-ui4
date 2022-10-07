import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { THEME_SWITCH_COUNT } from "../../../helper/configHelper";
import {
  READ_JSON,
  SELECTED_THEME_ID,
  WRITE_JSON,
} from "../../../helper/storageHelper";
import { HEADER_IMAGE } from "../../../helper/urlHelper";
import { gamePageDrawerHistoryToggle } from "../../../store/actions/settings.actions";
import GameHeader from "../../molecules/GameHeader";
import GameContent from "../content/GameContent";
import GamePageHistoryLeft from "../left/GamePageHistoryLeft";
import GamePageLeft from "../left/GamePageLeft";

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
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(30px);
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
  transition: all 0.25s;
  z-index: 1;
`;

const LeftContainerHistory = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  position: absolute;
  min-width: 90vw;
  max-width: 90vw;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  top: 0;
  left: ${(props) => (props.open ? "-1vw" : "-90vw")};
  transition: all 0.25s;
  z-index: 2;
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

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamePageSettings } = settings;
  const { selectedGameId, drawerOpen, drawerHistoryOpen } = gamePageSettings;

  useEffect(() => {
    dispatch(gamePageDrawerHistoryToggle(false));
    if (games && Object.keys(games).length === 0) {
      router.push("/");
    }
  }, []);

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
          <GamePageLeft />
        </LeftContainer>
        <LeftContainerHistory
          open={drawerHistoryOpen}
          image={HEADER_IMAGE(getStoredThemeId())}
        >
          <GamePageHistoryLeft gameId={gameId} />
        </LeftContainerHistory>
        <HeaderContainer>
          <GameHeader gameId={gameId} />
        </HeaderContainer>
        <ContentContainer>
          <GameContent gameId={gameId} />
        </ContentContainer>
      </BackDrop>
    </Container>
  );
}
