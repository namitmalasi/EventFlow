import { useEffect, useState } from "react";
import { UserType } from "../../../../interfaces";
import { message, Table } from "antd";
import {
  getAllUsers,
  updateUserData,
} from "../../../../api-services/user-service";
import { getDateTimeFormat } from "../../../../helpers/date-time-format";
import PageTitle from "../../../../components/page-title";

const AdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setloading] = useState(false);

  const getData = async () => {
    try {
      setloading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setloading(false);
    }
  };

  const updateuser = async (data: any) => {
    try {
      setloading(true);
      await updateUserData(data);
      message.success("User updated successfully");
      getData();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columns: any = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean, row: UserType) => {
        return (
          <select
            value={isAdmin ? "admin" : "user"}
            className="border border-solid border-gray-600"
            onChange={(e) => {
              const isAdminUpdated = e.target.value === "admin";
              updateuser({ userId: row._id, isAdmin: isAdminUpdated });
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        );
      },
    },
  ];
  return (
    <div>
      <PageTitle title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default AdminUsers;
