import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GameSelect from "../atoms/GameSelect";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  overflow: scroll;
`;

export default function GameSelectList() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const { games } = steam;

  return (
    <Container>
      <GameSelect />
    </Container>
  );
}
