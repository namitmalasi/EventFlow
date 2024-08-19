import { UserType } from "../../interfaces";
import MenuItems from "./menu-items";

const Sidebar = ({ user }: { user: UserType }) => {
  return (
    <div className="w-60 h-full">
      <MenuItems user={user} />
    </div>
  );
};

export default Sidebar;
