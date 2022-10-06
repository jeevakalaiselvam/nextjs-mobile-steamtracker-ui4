import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllGames } from "../store/actions/steam.actions";
import * as Loaders from "react-spinners";
import { useRouter } from "next/router";
import styled from "styled-components";
import { HEADER_IMAGE } from "../helper/urlHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  min-height: 100vh;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;
const BackdropContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const { games } = steam;

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [dispatch]);

  useEffect(() => {
    if (games && Object.keys(games).length > 0) {
      router.push("/games");
    }
  }, [games]);

  const getRandomGameId = () => {
    return "1151640";
  };

  return (
    <Container image={HEADER_IMAGE(getRandomGameId())}>
      <BackdropContainer>
        <Loaders.HashLoader />
      </BackdropContainer>
    </Container>
  );
}
