import React from "react";
import styled from "styled-components";
import { COLOR_LIGHT1, ICON_TROPHY } from "../../helper/constantHelper";
import { getIcon } from "../../helper/iconHelper";
import PropTypes from "prop-types";
import { getColor } from "../../helper/colorHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => (props.isHorizontal ? "row" : "column")};
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.size ?? "1rem"};
  color: ${(props) => getColor(props.color) ?? getColor(COLOR_LIGHT1)};
  margin: ${(props) =>
    props.isHorizontal ? "0rem 0.5rem 0rem 0rem" : "0rem 0rem 0.25rem 0rem"};
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => getColor(props.color) ?? getColor(COLOR_LIGHT1)};
  margin: ${(props) =>
    props.isHorizontal ? "0rem 0.5rem 0rem 0rem" : "0.25rem 0rem 0rem 0rem"};
  font-size: ${(props) => props.size ?? "1rem"};
`;

export default function Trophy({ count, isHorizontal, color, icon, size }) {
  return (
    <Container isHorizontal={isHorizontal ?? false}>
      <Icon size={size} color={color} isHorizontal={isHorizontal ?? false}>
        {getIcon(icon ?? ICON_TROPHY)}
      </Icon>
      <Count size={size} color={color} isHorizontal={isHorizontal ?? false}>
        {count ?? 0}
      </Count>
    </Container>
  );
}

Trophy.propTypes = {
  count: PropTypes.string.isRequired,
  isHorizontal: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
};
