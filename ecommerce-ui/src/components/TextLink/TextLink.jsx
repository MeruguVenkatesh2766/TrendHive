import styled from "styled-components";
import { Link } from "react-router-dom";
import { FooterContainer } from "../Footer/Footer";
import { Wrapper as Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Wrapper as BackLinkWrapper } from "../Utils/BackLinkWrapper";
import { COLORS } from "../../styles/constants";

const TextLink = ({ children, href, to }) => {
  const tag = to ? Link : "a";
  return (
    <Wrapper as={tag} to={to} href={href}>
      {children}
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  color: ${COLORS.text};
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${COLORS.secondary};
    text-decoration: revert;
  }

  ${FooterContainer} & {
    color: ${COLORS.secondary};

    &:hover {
      color: ${COLORS.text};
    }
  }

  ${Breadcrumbs} & {
    text-transform: none;
  }

  ${BackLinkWrapper} & {
    color: ${COLORS.secondary};
  }
`;

export default TextLink;
