import styled from "styled-components";

const Body = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.tbody``;

export default Body;
