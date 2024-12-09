import { Outlet } from "react-router-dom";
import { AdminHeader } from "./admin-header";
import { SideBar } from "./side-bar";

export function AdminLayout() {
	return (
		<div className="h-svh flex flex-col">
			<div>
				<AdminHeader />
			</div>
			<div className="overflow-y-auto flex-1">
				<Outlet />
			</div>
		</div>
	);
}
