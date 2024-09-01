import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./sidebar/sidebar";
import { getCurrentUser } from "../api-services/user-service";
import { message } from "antd";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/login");
    else {
      getData();
      setShowContent(true);
    }
  }, []);
  return (
    showContent &&
    user && (
      <div className="flex lg:flex-row flex-col gap-5 h-screen">
        <Sidebar user={user} />
        <div className="flex-1 px-5 lg:mt-10 pb-10 overflow-y-scroll">
          {children}
        </div>
      </div>
    )
  );
};

export default PrivateLayout;
