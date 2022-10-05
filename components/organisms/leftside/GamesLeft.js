import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { headerLeftGamesOff } from "../../../store/actions/menu.actions";
import SidebarClose from "../../atoms/SidebarClose";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 100%;
  min-height: 100vh;
`;

export default function GamesLeft() {
  const dispatch = useDispatch();

  return (
    <Container>
      <SidebarClose
        onClick={() => {
          dispatch(headerLeftGamesOff());
        }}
      />
    </Container>
  );
}
