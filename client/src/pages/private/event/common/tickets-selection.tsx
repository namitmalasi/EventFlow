import { useState } from "react";
import { EventType } from "../../../../interfaces";
import { Button, Input, message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentModal from "./payment-modal";
import { getClientSecret } from "../../../../api-services/payment-service";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const TicketsSelection = ({ eventData }: { eventData: EventType }) => {
  const [seletctedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [stripeOptions, setStripeOptions] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const ticketTypes = eventData.ticketTypes;

  const getClientSecretAndOpenPymentModal = async () => {
    try {
      setLoading(true);
      const response = await getClientSecret(totalAmount);
      setStripeOptions({ clientSecret: response.clientSecret });
      setShowPaymentModal(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

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
            const available = ticketType.available ?? ticketType.limit;
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
                  setMaxCount(available);
                }}
              >
                <h1 className="text-sm text-gray-700">{ticketType.name}</h1>
                <div className="flex justify-between">
                  <h1 className="text-sm font-bold">$ {ticketType.price}</h1>
                  <h1 className="text-xs">{available} Left</h1>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1">
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

          <span className="text-gray-600 text-sm mt-2 font-bold">
            {selectedTicketCount > maxCount
              ? `Only ${maxCount} tickets available`
              : ""}
          </span>
        </div>

        <div className="mt-7 flex justify-between items-center bg-gray-200 border border-solid p-3">
          <h1 className="text-xl text-gray-500 font-bold">
            Total Amount : $ {totalAmount}
          </h1>
          <Button
            type="primary"
            onClick={() => getClientSecretAndOpenPymentModal()}
            disabled={
              !seletctedTicketType ||
              !selectedTicketCount ||
              loading ||
              selectedTicketCount > maxCount
            }
            loading={loading}
          >
            Book Now
          </Button>
        </div>
      </div>

      {stripeOptions?.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          {showPaymentModal && (
            <PaymentModal
              showPaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
              selectedTicketType={seletctedTicketType}
              selectedTicketsCount={selectedTicketCount}
              totalAmount={totalAmount}
              event={eventData}
            />
          )}
        </Elements>
      )}
    </div>
  );
};

export default TicketsSelection;
