import { Outlet } from "react-router-dom";
import { AuthHeader } from "./auth-header";

export function MainLayout() {
	return (
		<div className="flex w-full flex-col h-screen">
			<AuthHeader />
			<div className="flex-1 bg-[#f6f7fa]">
				<Outlet />
			</div>
		</div>
	);
}
