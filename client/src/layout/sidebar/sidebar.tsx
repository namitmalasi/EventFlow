import { Menu } from "lucide-react";
import { UserType } from "../../interfaces";
import MenuItems from "./menu-items";
import { useState } from "react";
import { Drawer } from "antd";

const Sidebar = ({ user }: { user: UserType }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div>
      <div className="lg:flex hidden h-full lg:w-60">
        {" "}
        <MenuItems user={user} />
      </div>

      <div className="bg-info p-5 lg:hidden flex">
        <Menu
          size={20}
          color="white"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="cursor-pointer"
        />
      </div>

      {showMobileMenu && (
        <Drawer
          open={showMobileMenu}
          placement="left"
          onClose={() => setShowMobileMenu(false)}
        >
          <MenuItems user={user} />
        </Drawer>
      )}
    </div>
  );
};

export default Sidebar;
