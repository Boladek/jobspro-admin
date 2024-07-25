import { OrdinaryUsersPage } from "./ordinary-users-page";
import { UseAdminUsersContext } from "../../../context/admin-users-context";
import { Staff } from "./staff";

export function AdminUsersListPage() {
	const { activeTab } = UseAdminUsersContext();

	return (
		<>
			{activeTab === "pro" && <OrdinaryUsersPage />}
			{activeTab === "staff" && <Staff />}
		</>
	);
}
