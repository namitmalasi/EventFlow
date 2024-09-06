import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input } from "antd";

const TicketsSelection = ({ eventData }: { eventData: EventType }) => {
  const [seletctedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);

  const ticketTypes = eventData.ticketTypes;

  const selectedTicketPrice = ticketTypes.find(
    (ticketType) => ticketType.name === seletctedTicketType
  )?.price;

  const totalAmount = selectedTicketCount * (selectedTicketPrice || 0);
  return (
    <div>
      <div>
        <h1 className="text-info text-sm font-bold">Select Ticket Type</h1>

        <div className="flex flex-wrap gap-5 mt-3">
          {ticketTypes.map((ticketType, index) => {
            return (
              <div
                key={index}
                className={`p-2 border border-gray-200 bg-gray-100 lg:w-96 w-full cursor-pointer ${
                  seletctedTicketType === ticketType.name
                    ? "border-primary border-solid border-2"
                    : ""
                }`}
                onClick={() => {
                  setSelectedTicketType(ticketType.name);
                  setMaxCount(ticketType.limit);
                }}
              >
                <h1 className="text-sm text-gray-700">{ticketType.name}</h1>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">$ {ticketType.price}</h1>
                  <h1 className="text-xs">{ticketType.limit} Left</h1>
                </div>
              </div>
            );
          })}
        </div>

        <h1 className="text-info text-sm font-bold mt-10">
          Select Ticket Count
        </h1>

        <Input
          className="w-96"
          type="number"
          value={selectedTicketCount}
          onChange={(e) => setSelectedTicketCount(parseInt(e.target.value))}
          min={1}
          max={maxCount}
        />

        <div className="mt-7 flex justify-between items-center bg-gray-200 border border-solid p-3">
          <h1 className="text-xl text-gray-500 font-bold">
            Total Amount : $ {totalAmount}
          </h1>
          <Button type="primary">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default TicketsSelection;
