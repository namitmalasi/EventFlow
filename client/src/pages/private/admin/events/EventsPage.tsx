import { Button, message, Table } from "antd";
import PageTitle from "../../../../components/page-title";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEvents } from "../../../../api-services/events-service";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      console.log(response.data);
      setEvents(response.data);
    } catch {
      message.error("failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (date: any, row: any) => {
        return `${date} ${row.time}`;
      },
      key: "date",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Events" />
        <Button type="primary" onClick={() => navigate("/admin/events/create")}>
          Create Event
        </Button>
      </div>

      <Table dataSource={events} loading={loading} columns={columns} />
    </div>
  );
};

export default EventsPage;
