import { Button, message, Modal } from "antd";
import { EventType } from "../../../../interfaces";
import {
  AddressElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentModal = ({
  showPaymentModal,
  setShowPaymentModal,
  selectedTicketType,
  selectedTicketsCount,
  totalAmount,
  event,
}: {
  showPaymentModal: any;
  setShowPaymentModal: any;
  selectedTicketType: string;
  selectedTicketsCount: number;
  totalAmount: number;
  event: EventType;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: any) => {
    try {
      setLoading(true);
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment successful");
        setShowPaymentModal(false);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      title=" Make Payment"
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{ mode: "shipping", allowedCountries: ["US"] }}
        />

        <div className="mt-7 flex justify-end gap-6">
          <Button onClick={() => setShowPaymentModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
