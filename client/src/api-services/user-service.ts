import axios from "axios";

export const registerUser = async (data: any) => {
  const response = await axios.post("/api/users/register", data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axios.post("/api/users/login", data);
  return response.data;
};
