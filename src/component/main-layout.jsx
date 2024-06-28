import { Outlet } from "react-router-dom";
import { AuthHeader } from "./auth-header";
import { NavBar } from "./navigation-bar";

export function MainLayout() {
	return (
		<div className="flex w-full flex-col h-screen">
			<AuthHeader />
			<div className="flex-1 overflow-y-auto md:overflow-y-visible max-h-90vh">
				<Outlet />
			</div>
			<div className="md:hidden">
				<NavBar />
			</div>
		</div>
	);
}
