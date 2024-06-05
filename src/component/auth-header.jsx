import logo from "../assets/logo.png";
import menu from "../assets/menu-icon.png";
import notification from "../assets/notification.png";
import settings from "../assets/setting.png";
import { LinkElement } from "./link";
import { useState } from "react";
import { SearchComponent } from "./search-component";
import { useNavigate } from "react-router-dom";
import { AvatarSection } from "./avatar-section";
// import { UseAuth } from "../context/auth-context";
// import { useSelector } from "react-redux";

// const links = ["dashboard", "tasks", "messages", "wallets", "settings"];

const links = [
	{ title: "dashboard", url: "/dashboard" },
	{ title: "gigs", url: "/gigs" },
	{ title: "messages", url: "/messages" },
	{ title: "wallets", url: "/wallets" },
	{ title: "settings", url: "/settings/profile" },
];

export function AuthHeader() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="py-3 px-2 sm:px-6 w-full flex justify-between items-center border-gray-300 border-b sticky top-0 bg-white z-10">
			<div className="flex items-center justify-between w-2/5">
				<div
					className="relative cursor-pointer"
					onClick={() => navigate("/dashboard")}
				>
					<img src={logo} alt="Favicon" className="cursor-pointer h-8" />
					<div className="absolute inset-0 opacity-50 hover:bg-gray-50 z-10"></div>
				</div>
				<div className="hidden md:flex gap-1">
					{links.map((link, index) => (
						<LinkElement key={link.title + index} link={link} />
					))}
				</div>
			</div>
			<div className="w-3/5 hidden md:flex justify-end items-center gap-2">
				<div>
					<SearchComponent />
				</div>
				<img src={settings} className="h-5" />
				<img src={notification} className="h-5" />

				<AvatarSection />
			</div>
			<span
				className="relative cursor-pointer rounded-sm block md:hidden"
				onClick={toggleSidebar}
			>
				<img src={menu} className="h-8" />
				<div className="absolute inset-0 opacity-50 rounded-md hover:bg-gray-300 z-20"></div>
			</span>

			<div
				className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transition-transform transform ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex justify-end">
					<span
						className="p-2 cursor-pointer hover:scale-110 text-2xl text-red-500"
						onClick={toggleSidebar}
					>
						&times;
					</span>
				</div>
				<div className="flex items-center mb-4 px-4 gap-2">
					<img src={settings} className="h-5" />
					<img src={notification} className="h-5" />
					<AvatarSection />
				</div>
				<div className="px-4">
					<SearchComponent />
					<br />
					<div className="flex flex-col gap-2">
						{links.map((link, index) => (
							<div key={link.title + index} className="w-24">
								<LinkElement link={link} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
