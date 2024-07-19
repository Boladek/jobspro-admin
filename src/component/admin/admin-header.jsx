import { useLocation, useNavigate } from "react-router-dom";
import { AdminLink } from "./admin-link";
import { links } from "./admin-links";
import logo from "../../assets/logo.png";
// import { AvatarSection } from "../avatar-section";

export function AdminHeader() {
	const navigate = useNavigate();
	const location = useLocation();
	const url = location.pathname;

	console.log({ url });

	return (
		<div className="flex justify-between px-4 py-2 border-b">
			<div className="flex items-center justify-between">
				<div
					className="relative cursor-pointer"
					onClick={() => navigate("/admin/dashboard")}
				>
					<img src={logo} alt="Favicon" className="cursor-pointer h-8" />
					<div className="absolute inset-0 opacity-50 hover:bg-gray-50 z-10"></div>
				</div>
			</div>
			<div className="flex gap-1">
				{links.map((link) => (
					<AdminLink
						key={link.title}
						link={link}
						isSelected={url.includes(link.url)}
					/>
				))}
			</div>
			<div>
				{/* <AvatarSection /> */}
				Logo Section
			</div>
		</div>
	);
}
