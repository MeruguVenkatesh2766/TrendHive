import styled from "styled-components";
import { COLORS } from "../../styles/constants";

const Textarea = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

const Wrapper = styled.textarea`
  padding: 16px;
  width: 100%;
  display: block;
  border: 1px solid ${COLORS.textLight};
  background-color: ${COLORS.white};
  margin-bottom: 32px;

  &::placeholder {
    color: ${COLORS.textLight};
    opacity: 0.7;
  }

  &:focus {
    outline: 1px solid ${COLORS.secondary};
    border: none;
    background-color: ${COLORS.grayLight};
  }

  &:disabled {
    background-color: ${COLORS.grayLight};
    border-color: ${COLORS.gray};
  }
`;

export default Textarea;
