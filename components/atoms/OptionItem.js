import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COLOR_ACCENT,
  COLOR_REFRESH_INACTIVE,
  COLOR_TEXT_DULL,
  getColor,
} from "../../helper/colorHelper";
import { getIcon } from "../../helper/iconHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  min-height: 40px;
  margin-bottom: 1rem;

  &:hover,
  &:active {
    background-color: ${(props) => getColor(COLOR_ACCENT)};
  }

  &:hover div,
  &:active div {
    color: ${(props) => getColor(COLOR_REFRESH_INACTIVE)};
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 2.5rem;
  padding: 0.25rem 0.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0.25rem 0.5rem;
  padding-left: 1rem;
  font-size: 1.5rem;
  color: ${(props) => getColor(COLOR_TEXT_DULL)};
`;

export default function OptionItem({
  optionType,
  title,
  icon,
  optionClickHandler,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const settings = useSelector((state) => state.settings);
  const { games } = steam;
  const { gamesPageSettings } = settings;
  const { selectedGameId } = gamesPageSettings;

  return (
    <Container
      onClick={() => {
        optionClickHandler(optionType);
      }}
    >
      <Icon>{getIcon(icon)}</Icon>
      <Title>{title}</Title>
    </Container>
  );
}
