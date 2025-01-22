/* eslint-disable import/no-anonymous-default-export */
import styled from "styled-components";
import Footer from "./Footer";
import TextLink from "../TextLink";

export default {
  title: "Client/Footer",
  component: Footer,
};

export const Default = () => (
  <Footer>
    A mock website made with <Emoji>☕</Emoji> by{" "}
    <TextLink href="https://mv-portfolioone.netlify.app/">Venky</TextLink>.
  </Footer>
);

const Emoji = styled.span``;
