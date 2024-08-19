import {
  BookCheck,
  CandlestickChart,
  Home,
  List,
  LogOut,
  UsersRound,
} from "lucide-react";
import { UserType } from "../../interfaces";

const MenuItems = ({ user }: { user: UserType }) => {
  const iconSize = 16;
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: false,
    },
    {
      name: "Booking",
      path: "/bookings",
      icon: <List size={iconSize} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <CandlestickChart size={iconSize} />,
    },
    { name: "Logout", path: "/logout", icon: <LogOut size={iconSize} /> },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={iconSize} />,
      isActive: false,
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: <List size={iconSize} />,
      isActive: false,
    },

    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <BookCheck size={iconSize} />,
    },
    {
      name: "Users",
      path: "/admin/reports",
      icon: <UsersRound size={iconSize} />,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: <CandlestickChart size={iconSize} />,
    },
    { name: "Logout", path: "/logout", icon: <LogOut size={iconSize} /> },
  ];

  const menuToRender = user.isAdmin ? adminMenu : userMenu;
  return (
    <div className="bg-gray-200 h-full p-5">
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-2xl font-bold text-info">
          Event<b className="text-primary font-bold pl-2">Flow</b>
        </h1>
        <span className="text-sm text-gray-600">username</span>
      </div>

      <div className="flex flex-col gap-10 mt-20">
        {menuToRender.map((item: any) => (
          <div className="flex gap-5 text-sm items-center">
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
