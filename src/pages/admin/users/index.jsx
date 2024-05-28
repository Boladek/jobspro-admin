import { useState } from "react";
import { Calendar } from "../landing-page/calendar";
import { DashboardIcon } from "../../../assets/admin/dashboard-icon";
import { DocIcon } from "../../../assets/admin/doc-icon";
import { BaseInput } from "../../../component/input";
import { UsersTable } from "./users-table";
import { AddUserModal } from "./add-user-modal";

const links = [
	{ title: "active", icon: DashboardIcon },
	{ title: "others", icon: DocIcon },
];

function AdminUsersPage() {
	const today = new Date();
	today.setMonth(today.getMonth() + 1);
	today.setDate(0);
	const [startDate, setStartDate] = useState(
		new Date(today.getFullYear(), today.getMonth(), 1)
	);
	const [endDate, setEndDate] = useState(new Date(today));
	const [activeTab, setActiveTab] = useState(links[0].title);
	const [open, setOpen] = useState(false);

	return (
		<div>
			<div className="flex gap-4 items-center mb-4">
				<div className="flex items-center gap-2">
					<label htmlFor="filter" className="text-xs font-bold">
						Filter by:
					</label>
					<select id="filter" className="border rounded-full w-32 p-2 text-sm">
						<option>Country</option>
						<option>Togo</option>
					</select>
				</div>
				<div className="">
					<Calendar
						startDate={startDate}
						endDate={endDate}
						handleStartDate={(val) => setStartDate(val)}
						handleEndDate={(val) => setEndDate(val)}
					/>
				</div>
				<div className="flex gap-2">
					{links.map((active) => {
						const isActive = active.title === activeTab;
						return (
							<div
								key={active.title}
								className={`py-2 px-4 flex gap-2 items-center capitalize text-xs rounded-full hover:bg-[#E5EEFF] cursor-pointer hover:text-[#1A68FF] ${
									isActive ? "bg-[#E5EEFF] text-[#1A68FF] font-bold" : ""
								}`}
								onClick={() => setActiveTab(active.title)}
							>
								{active.title}{" "}
								<active.icon fill={isActive ? "#1A68FF" : undefined} />
							</div>
						);
					})}
				</div>
				<div className="w-56">
					<BaseInput placeholder="Search by Name" />
				</div>
				<div onClick={() => setOpen(true)} className="flex items-center justify-center rounded-full bg-black p-3 h-10 w-10 hover:opacity-60 cursor-pointer">
					<span className="text-white text-lg">&#x2B;</span>
				</div>
			</div>
			<div>
				<UsersTable />
			</div>

			{open && <AddUserModal open={open} handlClose={() => setOpen(false)} />}
		</div>
	);
}

export default AdminUsersPage;
