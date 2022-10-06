import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  min-width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-color: blue;
`;

export default function Atom() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steam = useSelector((state) => state.steam);
  const { games } = steam;

  useEffect(() => {
    if (games && Object.keys(games).length === 0) {
      router.push("/");
    }
  }, []);

  return <Container></Container>;
}
