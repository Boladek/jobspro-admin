import { useState } from "react";
import { Departments } from "./departments";
import { Privileges } from "./privileges";
import { Roles } from "./roles";
import { DashboardIcon } from "../../../../../assets/admin/dashboard-icon";
import { DocIcon } from "../../../../../assets/admin/doc-icon";

const tabs = [
	{ title: "departments", icon: DashboardIcon },
	{ title: "roles", icon: DocIcon },
	{ title: "privileges", icon: DocIcon },
];

export function Divisions() {
	const [isSelected, setIsSelected] = useState(tabs[0]);
	return (
		<div>
			<div className="flex gap-2 items-center py-4">
				{tabs.map((tab) => (
					<div
						key={tab.title}
						className={`px-5 py-2 rounded-full capitalize flex gap-2 items-center text-xs cursor-pointer hover:bg-[#E5EEFF] transition-all ease-linear 300s ${
							isSelected === tab
								? "bg-[#E5EEFF] text-[#1A68FF] font-bold"
								: "font-light"
						}`}
						onClick={() => setIsSelected(tab)}
					>
						<span>{tab.title}</span>
						<tab.icon fill={isSelected === tab ? "#1A68FF" : "#667085"} />
					</div>
				))}
			</div>
			<div>
				{isSelected === tabs[0] && <Departments />}
				{isSelected === tabs[1] && <Roles />}
				{isSelected === tabs[2] && <Privileges />}
			</div>
		</div>
	);
}
