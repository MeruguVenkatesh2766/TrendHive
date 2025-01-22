import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TextLink from "../../components/TextLink";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        {children}
      </div>
      <Footer>
        A mock website made with <Emoji>☕</Emoji> by{" "}
        <TextLink href="https://mv-portfolioone.netlify.app/">Venky</TextLink>.
      </Footer>
    </>
  );
};

const Emoji = styled.span``;

export default Layout;
