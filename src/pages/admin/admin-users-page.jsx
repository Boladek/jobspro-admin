import { Outlet } from "react-router-dom";
import { UserSideBar } from "../../component/admin/user-sidebar";

function AdminUsersPage() {
  return (
    <div className="flex gap-4 h-full p-4">
      <div className="w-64 flex flex-col h-full overflow-auto pr-4">
        <UserSideBar />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminUsersPage;
