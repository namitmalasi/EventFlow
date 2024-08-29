import axios from "axios";

export const createEvent = async (data: any) => {
  const response: any = await axios.post("/api/events/create-event", data);
  return response.data;
};

export const getEvents = async () => {
  const response: any = await axios.get("/api/events/get-events");
  return response.data;
};
