import { useState } from "react";
import General from "./general";
import LocationAndDate from "./location-and-date";
import Media from "./media";
import Tickets from "./tickets";
import { Form, Steps } from "antd";

export interface EventFormStepsProps {
  eventData: any;
  setEventData: any;
  currentStep: number;
  setCurrentStep: any;
  selectedMediaFiles?: any;
  setSelectedMediaFiles?: any;
}

const EventForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState({});
  const [selectedMediaFiles, setSelectedMediaFiles] = useState([]);

  const commonProps = {
    eventData,
    setEventData,
    currentStep,
    setCurrentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
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
          <Steps.Step key={index} title={step.name} />
        ))}
      </Steps>

      <div className="mt-5">{stepsData[currentStep].component}</div>
    </Form>
  );
};

export default EventForm;
