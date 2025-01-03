import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { BREAKPOINTS, COLORS } from "../../styles/constants";

const Sidebar = () => {
  return (
    <Wrapper>
      <SideHeader>
        <Logo src="/logo192.png" alt="digiKIT Admin Panel" />
      </SideHeader>
      <LinkWrapper>
        <LinkContainer>
          <Link to="/admin/dashboard">Dashboard</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/admin/products">Products</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/admin/orders">Orders</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/admin/categories">Categories</Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/admin/users">Users</Link>
        </LinkContainer>
      </LinkWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  background-color: ${COLORS.white};

  @media ${BREAKPOINTS.sm} {
    padding: 0 16px;
  }
`;

const SideHeader = styled.header`
  text-align: center;
  padding: 48px 0;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

const LinkWrapper = styled.ul`
  max-width: 260px;
  margin: 0 auto;
`;

const LinkContainer = styled.li`
  margin-bottom: 16px;
`;

const Link = styled(NavLink)`
  background-color: ${COLORS.adminGrayLight};
  border-radius: 8px;
  padding: 16px;
  display: block;
  color: ${COLORS.text};
  text-decoration: none;
  font-size: 1.25rem;

  &.active {
    background-color: ${COLORS.adminPrimaryLighter};
    color: ${COLORS.adminPrimary};
  }

  &:hover {
    background-color: ${COLORS.adminGray};
  }
`;

export default Sidebar;
