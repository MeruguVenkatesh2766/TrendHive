import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarCard,
  SidebarCardItem,
} from "../../../components/Sidebar";

const SideMenu = ({ location }) => {
  const path = location.pathname.split("/")[1];

  const navigate = useNavigate();

  const goToThere = (there) => {
    navigate(`${there}`);
  };

  return (
    <Sidebar>
      <SidebarCard title="Settings">
        <ul>
          <SidebarCardItem
            name="Orders"
            isActive={path === "orders"}
            onClick={() => goToThere("/orders")}
          />
          <SidebarCardItem
            name="Profile"
            isActive={path === "profile"}
            onClick={() => goToThere("/profile")}
          />
        </ul>
      </SidebarCard>
    </Sidebar>
  );
};

export default SideMenu;
