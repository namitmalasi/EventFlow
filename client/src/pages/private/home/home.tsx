import { message } from "antd";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../api-services/user-service";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";

const HomePage = () => {
  const { currentUser, setCurrentUser }: UsersStoreType =
    usersGlobalStore() as UsersStoreType;

  const getData = async () => {
    try {
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-5">
      <h1>HomePage</h1>
      <p>Welcome, {currentUser?.name}</p>
    </div>
  );
};

export default HomePage;
