import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./sidebar/sidebar";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) navigate("/login");
    else setShowContent(true);
  }, []);
  return (
    showContent && (
      <div className="flex gap-5 h-screen">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    )
  );
};

export default PrivateLayout;
