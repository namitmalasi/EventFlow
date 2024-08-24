import PageTitle from "../../../../../components/page-title";
import EventForm from "../common/event-form/event-form";

const CreateEventPage = () => {
  return (
    <div>
      <PageTitle title="Craete Event" />

      <div className="mt-5">
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEventPage;

