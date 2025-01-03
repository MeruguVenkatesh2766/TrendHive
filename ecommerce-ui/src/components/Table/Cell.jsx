import styled from "styled-components";
import { COLORS } from "../../styles/constants";
import { Wrapper as Row } from "./Row";

const Cell = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.td`
  padding: 24px;
  vertical-align: top;

  ${Row}:not(:last-child) & {
    border-bottom: 1px solid ${COLORS.gray};
  }
`;

export default Cell;
