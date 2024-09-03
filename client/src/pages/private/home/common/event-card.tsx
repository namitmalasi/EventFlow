import { EventType } from "../../../../interfaces";

const EventCard = ({ event }: { event: EventType }) => {
  return <div>{event.name}</div>;
};

export default EventCard;
