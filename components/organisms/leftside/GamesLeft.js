import React from "react";
import styled from "styled-components";
import SidebarClose from "../../atoms/SidebarClose";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 100%;
  min-height: 100vh;
`;

export default function GamesLeft() {
  return (
    <Container>
      <SidebarClose />
    </Container>
  );
}
