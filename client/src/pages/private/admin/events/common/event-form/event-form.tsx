import { useState } from "react";
import General from "./general";
import LocationAndDate from "./location-and-date";
import Media from "./media";
import Tickets from "./tickets";
import { Form, message, Steps } from "antd";
import { uploadFileAndReturnUrl } from "../../../../../../api-services/storage-service";
import { createEvent } from "../../../../../../api-services/events-service";
import { useNavigate } from "react-router-dom";

export interface EventFormStepsProps {
  eventData: any;
  setEventData: any;
  currentStep: number;
  setCurrentStep: any;
  selectedMediaFiles?: any;
  setSelectedMediaFiles?: any;
  loading?: boolean;
  onFinish?: any;
}

const EventForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState<any>({});
  const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      setLoading(true);
      const [...urls] = await Promise.all(
        selectedMediaFiles.map(async (file: any) => {
          return await uploadFileAndReturnUrl(file);
        })
      );

      eventData.media = urls;
      await createEvent(eventData);
      message.success("Event created successfully");
      navigate("/admin/events");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    eventData,
    setEventData,
    currentStep,
    setCurrentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    onFinish,
  };
  const stepsData = [
    {
      name: "General",
      component: <General {...commonProps} />,
    },
    {
      name: "Location And Date",
      component: <LocationAndDate {...commonProps} />,
    },
    {
      name: "Media",
      component: <Media {...commonProps} />,
    },
    {
      name: "Tickets",
      component: <Tickets {...commonProps} />,
    },
  ];

  return (
    <Form layout="vertical">
      <Steps current={currentStep} onChange={(step) => setCurrentStep(step)}>
        {stepsData.map((step, index) => (
          <Steps.Step
            key={index}
            title={step.name}
            className="text-xs"
            disabled={index > currentStep}
          />  
        ))}
      </Steps>

      <div className="mt-5">{stepsData[currentStep].component}</div>
    </Form>
  );
};

export default EventForm;
