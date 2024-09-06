import { useEffect, useState } from "react";
import { EventType } from "../../../interfaces";
import { Image, message } from "antd";
import { getEventById } from "../../../api-services/events-service";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/spinner";
import { MapPin, Timer } from "lucide-react";
import {
  getDateFormat,
  getDateTimeFormat,
} from "../../../helpers/date-time-format";
import TicketsSelection from "./common/tickets-selection";

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

  const renderEventProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-800">{label}</span>
        <span className="text-gray-500 font-semibold">{value}</span>
      </div>
    );
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
  return (
    eventData && (
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gray-600">{eventData?.name}</h1>
          <div className="flex gap-10">
            <div className="flex gap-1 items-center text-gray-500">
              <MapPin size={12} />
              <span className="text-gray-500 text-xs">
                {eventData?.address},{eventData?.city},{eventData?.pincode}
              </span>
            </div>

            <div className="flex gap-1 items-center text-gray-500">
              <Timer size={12} />
              <span className="text-gray-500 text-xs">
                {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-7">
          {eventData?.media.map((media, index) => (
            <Image
              src={media}
              key={index}
              height={220}
              className="rounded object-cover"
            />
          ))}
        </div>

        <div className="mt-7">
          <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-3 mt-7 bg-gray-100">
          {renderEventProperty("Organizer", eventData.organizer)}
          {renderEventProperty("Address", eventData.address)}
          {renderEventProperty("City", eventData.city)}
          {renderEventProperty("Pincode", eventData.pincode)}
          {renderEventProperty("Date", getDateFormat(eventData.date))}
          {renderEventProperty("Time", eventData.time)}

          <div className="col-span-3">
            {renderEventProperty("Guests", eventData.guests.join(", "))}
          </div>
        </div>

        <div className="mt-5">
          <TicketsSelection eventData={eventData} />
        </div>
      </div>
    )
  );
};

export default EventInfoPage;
