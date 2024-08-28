import { Button, Input } from "antd";
import { EventFormStepsProps } from "./event-form";

const Tickets = ({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
  loading,
  onFinish,
}: EventFormStepsProps) => {
  const onAddTicketType = () => {
    const newTicketType = eventData.ticketTypes || [];
    newTicketType.push({
      name: "",
      price: 0,
      limit: 0,
    });
    setEventData({ ...eventData, ticketTypes: newTicketType });
  };

  const onTicketTypePropertyValueChange = ({
    property,
    value,
    index,
  }: {
    property: string;
    value: string | number;
    index: number;
  }) => {
    const newTicketType = eventData.ticketTypes || [];
    newTicketType[index][property] = value;
    setEventData({ ...eventData, ticketTypes: newTicketType });
  };

  const onTicketTypeDelete = (index: number) => {
    const newTicketType = eventData.ticketTypes || [];
    newTicketType.splice(index, 1);
    setEventData({ ...eventData, ticketTypes: newTicketType });
  };
  return (
    <div className="flex flex-col gap-5">
      <Button className="w-max" onClick={() => onAddTicketType()}>
        Add Ticket Type
      </Button>

      {eventData?.ticketTypes?.length > 0 && (
        <div>
          <div className="grid grid-cols-4 gap-5">
            <span className="font-semibold">Name</span>
            <span className="font-semibold">Price</span>
            <span className="font-semibold">Limit</span>
          </div>

          <div className="flex flex-col gap-3">
            {eventData.ticketTypes.map((ticketType: any, index: number) => (
              <div className="grid grid-cols-4 gap-5">
                <Input
                  placeholder="Name"
                  value={ticketType.name}
                  onChange={(e) =>
                    onTicketTypePropertyValueChange({
                      property: "name",
                      value: e.target.value,
                      index,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  type="number"
                  value={ticketType.price}
                  onChange={(e) =>
                    onTicketTypePropertyValueChange({
                      property: "price",
                      value: e.target.value,
                      index,
                    })
                  }
                />
                <Input
                  placeholder="Limit"
                  type="number"
                  value={ticketType.limit}
                  onChange={(e) =>
                    onTicketTypePropertyValueChange({
                      property: "limit",
                      value: e.target.value,
                      index,
                    })
                  }
                />
                <Button
                  type="link"
                  danger
                  onClick={() => onTicketTypeDelete(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between col-span-3">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={onFinish}
          disabled={loading}
          loading={loading}
        >
          Save and Finish
        </Button>
      </div>
    </div>
  );
};

export default Tickets;
