// import { FinancialStatementProvider } from "../../../../context/financial-statement-context";
// import { FinancialStatement } from "./financial-statement";
import { generateArray } from "../../../../helpers/function";
import { Divisions } from "./divisions";
import avatar from "../../../../assets/profile-avatar.png";
import { StaffDetails } from "./staff-details";
import { useState } from "react";
import { AddStaffModal } from "./staff-details/add-staff-modal";

export function Staff() {
	const [open, setOpen] = useState(false);
	const [openStaff, setOpenStaff] = useState(false);

	return (
		<div className="px-4 flex gap-4 h-full">
			<div className="w-7/12 h-full">
				<div className="flex gap-4 justify-between items-center text-xs py-4">
					<div className="px-3 py-1 rounded-full font-semibold text-[#025949] bg-[#FFDE16]">
						Members
					</div>
					<div className="flex-1">
						<input
							placeholder="Search"
							className="p-2 text-sm bg-gray-100 w-full rounded-md"
						/>
					</div>
					<div className="flex gap-4">
						<div className="border p-2 px-6 rounded-md text-xs relative font-bold">
							Roles
							<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-adminPrimary text-white font-bold">
								4
							</span>
						</div>
						<div className="border p-2 px-6 rounded-md text-xs relative font-bold">
							Team
							<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#0FFF9A] font-bold">
								4
							</span>
						</div>
						<div className="border p-2 px-6 rounded-md text-xs relative font-bold">
							Countries
							<span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#FFDE16] font-bold">
								4
							</span>
						</div>
					</div>
					<div
						onClick={() => setOpenStaff(true)}
						className="flex items-center justify-center rounded-full bg-black p-2 h-10 w-10 hover:opacity-60 cursor-pointer"
					>
						<span className="text-white text-3xl">&#x2B;</span>
					</div>
				</div>
				<div>
					<table className="w-full rounded-md">
						<thead className="bg-adminPrimary shadow-sm">
							<tr className="rounded-md text-white">
								<th className="py-4 px-2 text-sm text-left">Name</th>
								<th className="py-4 px-2 text-sm text-left">Team</th>
								<th className="py-4 px-2 text-sm text-left">Role</th>
								<th className="py-4 px-2 text-sm text-left">Country</th>
								<th></th>
							</tr>
						</thead>
						<tbody className="rounded-xl">
							{generateArray(5).map(() => (
								<tr
									key={Math.random()}
									className="cursor-pointer hover:bg-gray-100"
								>
									<td className="py-2 px-2 text-xs text-left">
										<div className="flex gap-1 items-center">
											<img
												src={avatar}
												alt="User Avatar"
												className="h-10 w-10 rounded-full"
											/>
											<div>
												<p className="font-bold text-adminPrimary">
													Fatai Oladimeji
												</p>
												<p style={{ fontSize: ".5rem" }}>#oiuoiuyyuoyoiyiu</p>
											</div>
										</div>
									</td>
									<td className="py-2 px-2 text-xs text-left">Finance</td>
									<td className="py-2 px-2 text-xs text-left">
										Finance Director
									</td>
									<td className="py-2 px-2 text-xs text-left">Nigeria</td>
									<td className="py-2 px-2 text-xs text-left">
										<span
											className="px-4 py-1.5 rounded-lg border-adminPrimary border bg-primary/10 text-adminPrimary"
											onClick={() => setOpen(true)}
										>
											View
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="w-5/12 h-full">
				<Divisions />
			</div>
			{/* <FinancialStatementProvider>
				<FinancialStatement />
			</FinancialStatementProvider> */}

			{openStaff && (
				<AddStaffModal
					open={openStaff}
					handleClose={() => setOpenStaff(false)}
				/>
			)}
			{open && <StaffDetails handleClose={() => setOpen(false)} />}
		</div>
	);
}
