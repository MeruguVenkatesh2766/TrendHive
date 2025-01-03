import styled from "styled-components";
import { COLORS } from "../../styles/constants";

const Row = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export const Wrapper = styled.tr`
  &:hover {
    background-color: ${COLORS.grayLight};
  }
`;

export default Row;
