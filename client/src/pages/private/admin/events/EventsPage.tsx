import { Button } from "antd";
import PageTitle from "../../../../components/page-title";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center mt-5">
      <PageTitle title="Events" />
      <Button type="primary" onClick={() => navigate("/admin/events/create")}>
        Create Event
      </Button>
    </div>
  );
};

export default EventsPage;
