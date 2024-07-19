import { DashboardIcon } from "../../assets/admin/dashboard-icon";
import { UsersIcon } from "../../assets/admin/users-icon";
import { RingingBellIcon } from "../../assets/admin/ringing-bell-icon";
import { TextingIcon } from "../../assets/admin/texting-icon";
import { DocIcon } from "../../assets/admin/doc-icon";

export const links = [
	{
		title: "Dashboard",
		url: "/admin/dashboard",
		icon: DashboardIcon,
	},
	{
		title: "Jobs",
		url: "/admin/jobs",
		icon: DocIcon,
	},
	{
		title: "Users",
		url: "/admin/users",
		icon: UsersIcon,
	},
	{
		title: "Messages",
		url: "/admin/messages",
		icon: TextingIcon,
	},
	// {
	// 	title: "Disputes",
	// 	url: "/admin/disputes",
	// 	icon: RingingBellIcon,
	// },
	{
		title: "Push Notifications",
		url: "/admin/push-notifications",
		icon: RingingBellIcon,
	},
];
