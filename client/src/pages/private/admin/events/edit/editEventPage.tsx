import { useEffect, useState } from "react";
import PageTitle from "../../../../../components/page-title";
import EventForm from "../common/event-form/event-form";
import { getEventById } from "../../../../../api-services/events-service";
import { useParams } from "react-router-dom";
import { message } from "antd";
import Spinner from "../../../../../components/spinner";

const EditEventPage = () => {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error) {
      message.error("failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className="mt-5">
        <EventForm initialData={eventData} type="edit" />
      </div>
    </div>
  );
};

export default EditEventPage;
