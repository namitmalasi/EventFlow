import { message } from "antd";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../api-services/user-service";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";
import { getEvents } from "../../../api-services/events-service";
import EventCard from "./common/event-card";
import Filters from "./common/filters";
import Spinner from "../../../components/spinner";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    searchText: "",
    date: "",
  });
  const [loading, setloading] = useState(false);
  const { currentUser, setCurrentUser } = usersGlobalStore() as UsersStoreType;

  const getData = async (filterObj: any) => {
    try {
      setloading(true);
      const response = await getEvents(filterObj);
      setEvents(response.data);
    } catch (error: any) {
      message.error(error);
    } finally {
      setloading(false);
    }
  };

  const getUserData = async () => {
    try {
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getUserData();
    getData({ searchText: "", date: "" });
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <p>Welcome, {currentUser?.name}</p>

      <Filters filters={filters} setFilters={setFilters} onFilter={getData} />
      <div className="flex flex-col gap-7 mt-7">
        {events.map((event: any) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
