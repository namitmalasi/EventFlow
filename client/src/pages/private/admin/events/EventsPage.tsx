import { Button, message, Table } from "antd";
import PageTitle from "../../../../components/page-title";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteEvent,
  getEvents,
} from "../../../../api-services/events-service";
import { getDateTimeFormat } from "../../../../helpers/date-time-format";
import { Pen, Trash2 } from "lucide-react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents({ searchText: "", date: "" });
      setEvents(response.data);
    } catch {
      message.error("failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const deleteEventHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteEvent(id);
      getData();
      message.success("Event deleted successfully");
    } catch (error: any) {
      message.error(error);
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
        return getDateTimeFormat(`${date} ${row.time}`);
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
      render: (date: any) => {
        return getDateTimeFormat(date);
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_text: any, record: any) => {
        return (
          <div className="flex gap-5" key={record._id}>
            <Trash2
              className="cursor-pointer text-red-700"
              size={16}
              onClick={() => deleteEventHandler(record._id)}
            />
            <Pen
              className="cursor-pointer text-yellow-700"
              size={16}
              onClick={() => navigate(`/admin/events/edit/${record._id}`)}
            />
          </div>
        );
      },
      key: "actions",
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
