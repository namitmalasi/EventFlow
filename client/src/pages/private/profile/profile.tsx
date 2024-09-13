import PageTitle from "../../../components/page-title";
import { getDateTimeFormat } from "../../../helpers/date-time-format";
import usersGlobalStore, { UsersStoreType } from "../../../store/users-store";

const ProfilePage = () => {
  const { currentUser }: UsersStoreType = usersGlobalStore() as UsersStoreType;

  if (!currentUser) return null;

  const renderUserProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-800">{label}</span>
        <span className="text-gray-500 font-semibold">{value}</span>
      </div>
    );
  };
  return (
    <div>
      <PageTitle title="Profile" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {renderUserProperty("User Id", currentUser?._id)}
        {renderUserProperty("Name", currentUser?.name)}
        {renderUserProperty("Email", currentUser?.email)}
        {renderUserProperty(
          "Joined At",
          getDateTimeFormat(currentUser?.createdAt)
        )}
        {renderUserProperty(
          "Status",
          currentUser?.isActive ? "Active" : "Inactive"
        )}
        {renderUserProperty("Role", currentUser?.isAdmin ? "Admin" : "User")}
      </div>
    </div>
  );
};

export default ProfilePage;
