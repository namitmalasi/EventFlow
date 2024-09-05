import { useEffect, useState } from "react";
import { EventType } from "../../../interfaces";
import { message } from "antd";
import { getEventById } from "../../../api-services/events-service";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/spinner";

const EventInfoPage = () => {
  const [eventData, setEventData] = useState<EventType | null>();
  const [loading, setloading] = useState(false);
  const params: any = useParams();

  const getData = async () => {
    try {
      setloading(true);
      const response = await getEventById(params.id);
      setEventData(response.data);
    } catch (error: any) {
      message.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return <div>EventInfoPage</div>;
};

export default EventInfoPage;
