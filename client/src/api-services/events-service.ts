import axios from "axios";

export const createEvent = async (data: any) => {
  const response: any = await axios.post("/api/events/create-event", data);
  return response.data;
};

export const getEvents = async () => {
  const response: any = await axios.get("/api/events/get-events");
  return response.data;
};

export const getEventById = async (id: string) => {
  const response: any = await axios.get(`/api/events/get-event/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, data: any) => {
  const response: any = await axios.put(`/api/events/edit-event/${id}`, data);
  return response.data;
};
