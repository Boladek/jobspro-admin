import { useLocation } from "react-router-dom";
import { AdminLink } from "./admin-link";
import { links } from "./admin-links";

export function AdminHeader() {
	const location = useLocation();
	const url = location.pathname.split("/").pop();

	return (
		<div className="flex justify-between p-2">
			<div className="flex gap-1">
				{links.map((link) => (
					<AdminLink
						key={link.title}
						link={link}
						isSelected={link.url.split("/").pop() === url}
					/>
				))}
			</div>
			<div>user section</div>
		</div>
	);
}
