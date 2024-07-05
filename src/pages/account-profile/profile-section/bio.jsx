import { useState } from "react";
import { LocationIcon } from "../../../assets/admin/location-icon";
import { PersonIcon } from "../../../assets/person-icon";
import { UseAuth } from "../../../context/auth-context";
import { MailIcon } from "../../../assets/mail-icon";
import { BusinessLocation } from "../../more/profile/business-location";
import { PenIcon } from "../../../assets/pen-icon";
import { AboutUs } from "../../more/profile/about-us";

export function AccountBio() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);
	const [openAbout, setOpenAbout] = useState(false);
	return (
		<div>
			<div className="py-1 px-6 rounded-full border bg-gray-50 w-fit mb-4 text-adminPrimary border-adminPrimary">
				Bio
			</div>
			<form className="grid grid-cols-1 gap-4 mb-4">
				<div className="flex gap-4">
					<div className="flex-1">
						<p className="text-xs mb-1">First Name</p>
						<div className="rounded-md border-adminPrimary border p-2 items-center flex">
							<span>
								<PersonIcon fill="#4440FF" />
							</span>
							<div className="flex-1 text-center text-[#667085]">
								{user?.firstName}
							</div>
						</div>
					</div>
					<div className="flex-1">
						<p className="text-xs mb-1">Last Name</p>
						<div className="rounded-md border-adminPrimary border p-2 items-center flex">
							<span>
								<PersonIcon fill="#4440FF" />
							</span>
							<div className="flex-1 text-center text-[#667085]">
								{user?.lastName}
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<p className="text-xs mb-1">Email</p>
					<div className="rounded-md border-adminPrimary border p-2 items-center flex">
						<span>
							<MailIcon />
						</span>
						<div className="flex-1 text-center text-[#667085]">
							{user?.email}
						</div>
					</div>
				</div>
				<div className="flex gap-4">
					<div className="flex-1">
						<p className="text-xs mb-1">Country</p>
						<div className="rounded-md border-adminPrimary border p-2 items-center flex">
							<span>
								<LocationIcon fill="#4440FF" />
							</span>
							<div className="flex-1 text-center text-[#667085]">
								{user?.country?.name}
							</div>
						</div>
					</div>
					<div className="flex-1">
						<p className="text-xs mb-1">State</p>
						<div className="rounded-md border-adminPrimary border p-2 items-center flex">
							<span>
								<LocationIcon fill="#4440FF" />
							</span>
							<div className="flex-1 text-center text-[#667085]">
								{user?.state?.name}
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<p className="text-xs mb-1">Address</p>
					<div className="rounded-md border-adminPrimary border p-2 items-center flex gap-2">
						<span>
							<LocationIcon fill="#4440FF" />
						</span>
						<div className="flex-1 text-center text-nowrap text-[#667085] overflow-x-auto">
							{user?.address}
						</div>
						<span onClick={() => setOpen(true)}>
							<PenIcon />
						</span>
					</div>
				</div>
			</form>
			<p className="text-xs font-bold">About</p>
			<div className="p-3 rounded-lg bg-gray-100 text-xs flex gap-1">
				<div className="flex-1">{user?.about || "N/A"}</div>
				<span onClick={() => setOpenAbout(true)}>
					<PenIcon />
				</span>
			</div>

			{open && (
				<BusinessLocation open={open} handleClose={() => setOpen(false)} />
			)}
			{openAbout && (
				<AboutUs open={openAbout} handleClose={() => setOpenAbout(false)} />
			)}
		</div>
	);
}
