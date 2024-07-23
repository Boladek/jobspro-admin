import { OrdinaryUsersPage } from "./ordinary-users-page";
import { UseAdminUsersContext } from "../../../context/admin-users-context";

export function AdminUsersListPage() {
	const { activeTab } = UseAdminUsersContext();

	return <>{activeTab === "pro" && <OrdinaryUsersPage />}</>;
}
