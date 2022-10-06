import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLOR_TEXT_DULL, getColor } from "../../helper/colorHelper";

const Container = styled.div`
  display: flex;
  width: 67.5vw;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: url(${(props) => props.src});
  background-size: contain;
`;

const Name = styled.div`
  display: flex;
  padding: 1rem 0rem 0rem 0rem;
  font-size: 1.75rem;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  const image =
    "https://avatars.akamai.steamstatic.com/3984d41a867b9b4eca056cdfcd1134bd591d9100_full.jpg";

  return (
    <Container>
      <Image src={image}></Image>
      <Name>NotRealLogan</Name>
    </Container>
  );
}
