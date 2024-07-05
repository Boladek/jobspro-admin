import { HomeIcon } from "../assets/home-icon";
import { DocIcon } from "../assets/doc-icon";
import { PersonIcon } from "../assets/person-icon";
import { UseAuth } from "../context/auth-context";
import { LinkElement } from "./link";

export function NavBar() {
	const {
		user: { userType },
	} = UseAuth();
	const links = [
		{ title: "dashboard", url: "/dashboard", icon: HomeIcon },
		{ title: "gigs", url: `/gigs/${userType}`, icon: DocIcon },
		// { title: "chats", url: "/messages", icon: ChatBubbleIcon },
		// { title: "wallets", url: "/wallets" },
		{ title: "profile", url: "/profile", icon: PersonIcon },
	];
	return (
		<div className="flex gap-2 w-full justify-evenly p-2 shadow-sm border-t z-30 bg-white">
			{links.map((link, index) => (
				<LinkElement key={link.title + index} link={link} />
			))}
		</div>
	);
}
