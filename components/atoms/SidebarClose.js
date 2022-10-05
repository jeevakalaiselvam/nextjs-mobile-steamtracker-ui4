import React from "react";
import styled from "styled-components";
import { getColor } from "../../helper/colorHelper";
import {
  COLOR_ACCENT,
  COLOR_DANGER,
  ICON_CLOSE,
} from "../../helper/constantHelper";
import { getIcon } from "../../helper/iconHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  font-size: 2rem;
`;

const IconClose = styled.div`
  font-size: 3rem;
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    color: ${(props) => getColor(COLOR_DANGER)};
  }
`;

export default function SidebarClose({ onClick }) {
  return (
    <Container onClick={onClick}>
      <IconClose>{getIcon(ICON_CLOSE)}</IconClose>
    </Container>
  );
}
