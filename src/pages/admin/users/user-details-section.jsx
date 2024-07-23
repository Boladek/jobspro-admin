import React from "react";
import avatar from "../../../assets/profile-avatar.png";
import { ProgressBar } from "../../../component/admin/progress-bar";

export function UserDetailsSection() {
	return (
		<div className="rounded-t-lg border rounded-b-lg">
			<div className="bg-[#F6F4FD] p-4 pt-6 flex justify-between items-center rounded-t-lg border-b">
				<div className="flex gap-2 items-center">
					<img src={avatar} className="h-10 w-10" />
					<div className="text-xs">
						<p className="text-[#3514FF] font-bold">Uzomaka Omotola</p>
						<p className="text-gray-600">Nail Technician</p>
					</div>
				</div>
				<div>
					<span className="p-2 px-6 rounded-full border border-[#3514FF] text-[#3514FF] text-xs font-bold">
						Tier 1
					</span>
				</div>
			</div>
			<div className="p-4 border-b">
				<div className="flex justify-between mb-4">
					<div className="flex-1">
						<p className="text-tiny text-gray-400">Finclusion ID</p>
						<p className="text-xs font-bold">NG21-08912456789</p>
					</div>
					<div className="flex-1">
						<p className="text-tiny text-gray-400">Email</p>
						<p className="text-xs font-bold">NG21-08912456789</p>
					</div>
					<div className="flex-1">
						<p className="text-tiny text-gray-400">Phone</p>
						<p className="text-xs font-bold">NG21-08912456789</p>
					</div>
				</div>
				<div className="flex items-center w-full gap-4">
					<div className="p-3 px-6 rounded-md text-xs text-[#3514FF] bg-[#E9E5FF] font-bold">
						Message
					</div>
					<div className="border p-3 px-6 rounded-md text-xs relative font-bold">
						Dispute
						<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#FFDE16] font-bold">
							4
						</span>
					</div>
					<div className="border p-3 px-4 rounded-md border-[#3514FF]">
						<p className="text-xs text-[#3514FF]">Wallet</p>
						<div className="w-6">
							<ProgressBar color="#0FFF9A" />
						</div>
						<div>
							<span className="text-xs">NGN</span>{" "}
							<span className="text-lg text-[#3514FF] font-bold">400,000</span>
						</div>
					</div>
				</div>
			</div>
			<div className="border-b p-4">
				<p className="text-xs font-bold">Bio</p>
				<div className="text-tiny">
					23+ years of experience in the aerospace engineering domain with
					extensive expertise in the industry, start-up consultant, and
					educational consultant. Responsibilities - Customer interface, project
					management, delivery management, program management, sales and
					pre-sales support, campaigning, competency development, team building,
					making competitive proposals, mentoring, and consultant
				</div>
			</div>
			<div className="border-b p-4">
				<div className="text-xs font-bold mb-2">Experience</div>
				<div className="flex justify-between items-center mb-2">
					<span className="text-[#3514FF] bg-[#E9E5FF] p-1 px-4 text-tiny font-bold rounded-md">
						Senior Product Designer
					</span>
					<div className="text-tiny">
						<div>2012 - Present</div>
						<div className="w-7">
							<ProgressBar color="#212121" thickness={0.5} />
						</div>
					</div>
				</div>
				<div className="text-tiny">
					23+ years of experience in the aerospace engineering domain with
					extensive expertise in the industry, start-up consultant, and
					educational consultant. Responsibilities - Customer interface, project
					management, delivery management, program management, sales and
					pre-sales support, campaigning, competency development, team building,
					making competitive proposals, mentoring, and consultant
				</div>
				<br />
				<div className="flex justify-between items-center mb-2">
					<span className="text-[#3514FF] bg-[#E9E5FF] p-1 px-4 text-tiny font-bold rounded-md">
						Senior Product Designer
					</span>
					<div className="text-tiny">
						<div>2012 - Present</div>
						<div className="w-7">
							<ProgressBar color="#212121" thickness={0.5} />
						</div>
					</div>
				</div>
				<div className="text-tiny">
					23+ years of experience in the aerospace engineering domain with
					extensive expertise in the industry, start-up consultant, and
					educational consultant. Responsibilities - Customer interface, project
					management, delivery management, program management, sales and
					pre-sales support, campaigning, competency development, team building,
					making competitive proposals, mentoring, and consultant
				</div>
			</div>
			<div className="border-b p-4 rounded-b-lg">
				<p className="text-xs font-bold mb-4">Skills</p>
				<div className="text-tiny flex gap-4">
					{["Skills", "Dancing", "Basketball"].map((item) => (
						<span
							key={item}
							className="py-1 px-4 border rounded-full font-semibold text-[#3514FF] bg-[#E9E5FF]"
						>
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
