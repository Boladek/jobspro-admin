// import { DashboardIcon } from "../../assets/admin/dashboard-icon";
// import { DocIcon } from "../../assets/admin/doc-icon";
// import { UsersIcon } from "../../assets/admin/users-icon";
// import { RingingBellIcon } from "../../assets/admin/ringing-bell-icon";
// import { TextingIcon } from "../../assets/admin/texting-icon";
// import dashboardIcon from "../../assets/dashboard-icon.svg"
// import textsIcon from "../../assets/texts-icon.svg"
// import peopleIcon from "../../assets/people-icon.svg"
// import chatsIcon from "../../assets/chats-icon.svg"
// import chartIcon from "../../assets/chart-icon.svg"
// import bellIcon from "../../assets/bell-icon.svg"
import { DashboardIcon } from "../../assets/dashboard-icon.jsx";
import { TextsIcon } from "../../assets/texts-icon.jsx";
import { PeopleIcon } from "../../assets/people-icon.jsx";
import { ChatsIcon } from "../../assets/chats-icon.jsx";
import { ChartIcon } from "../../assets/chart-icon.jsx";
import { BellIcon } from "../../assets/bell-icon.jsx";



export const links = [
	{ title: "Dashboard", url: "/admin/dashboard", icon: DashboardIcon },
	{ title: "Jobs", url: "/admin/jobs", icon: TextsIcon },
	{ title: "Users", url: "/admin/users", icon: PeopleIcon },
	{ title: "Messages", url: "/admin/messages", icon: ChatsIcon },
	{ title: "Push Notifications", url: "/admin/push-notifications", icon: BellIcon },
	{ title: "Financials", url: "/admin/financials", icon: ChartIcon },
];
