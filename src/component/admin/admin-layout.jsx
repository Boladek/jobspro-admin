import { Outlet } from "react-router-dom";
import { AdminHeader } from "./admin-header";
import { SideBar } from "./side-bar";

export function AdminLayout() {
	return (
		<div className="flex h-svh">
			<div className="w-64">
				<SideBar />
			</div>
			<div className="flex-1 border-l h-full flex flex-col">
				<div>
					<AdminHeader />
				</div>
				<div className="p-2 overflow-y-auto">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
