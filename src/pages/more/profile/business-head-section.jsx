import { useState } from "react";
import avatar from "../../../assets/profile-avatar.png";
// import check from "../../../assets/tick-circle.png";
import member from "../../../assets/member.png";
import { EditIcon } from "../../../assets/edit-icon";
import { useSelector } from "react-redux";
import { AboutUs } from "./about-us";
import { BusinessLocation } from "./business-location";
import camera from "../../../assets/camera.png";
import { UploadProfilePicModal } from "../../../component/upload-pic-modal";
import { UseAuth } from "../../../context/auth-context";
import { formatDate } from "../../../helpers/function";

export function BusinessHeadSection() {
	const { user: details, name } = UseAuth();
	const { user } = useSelector((state) => state.auth);
	const [open, setOpen] = useState(false);
	const [openPic, setOpenPic] = useState(false);
	const [openLocation, setOpenLocation] = useState(false);

	return (
		<div className="px-4 py-2 relative mb-2">
			<div className="absolute -top-10 border-4 border-white rounded-full h-20 w-20 overflow-hidden shadow-sm">
				<div
					className="absolute opacity-0 hover:opacity-100 w-full h-full hover:bg-black/50 rounded-full flex justify-center items-center cursor-pointer"
					onClick={() => setOpenPic(true)}
				>
					<img src={camera} className="h-6" alt="Camera Icon" />
				</div>
				<img
					src={details.profilePicture ?? avatar}
					alt="user avatar"
					className="h-full w-full"
				/>
			</div>
			<div className="flex justify-between mt-10 mb-2">
				<div>
					{/* <div className="flex gap-2 items-center mb-2">
						<span>Biola&apos;s Saloon</span>
						<img src={check} alt="Check alt" className="h-5" />
						<EditIcon size={0.8} />
					</div> */}
					<p className="text-sm font-bold mb-2">{name}</p>

					<div className="mb-4">
						<span className="p-2 px-3 rounded-full text-xs capitalize bg-[#FFC700] text-dark">
							{user?.userType}
						</span>
					</div>
					{/* <div className="flex justify-between items-center mb-2">
						<div className="flex gap-1 items-center text-xs font-extralight">
							<img src={member} className="h-5" />
							<span>Member since</span>
						</div>
						<p className="text-xs font-semibold">
							{formatDate(details.createdAt)}
						</p>
					</div> */}
					<div>
						<div className="flex gap-1 items-center text-xs font-bold justify-between mb-2">
							<span>Business Location</span>
							<span onClick={() => setOpenLocation(true)}>
								<EditIcon size={0.9} />
							</span>
						</div>
						{details.address && (
							<p className="text-xs text-gray-400">
								{`${details.address}${!!details?.city?.name && ","} ${
									details?.city?.name
								}${!!details?.state?.name && ","} ${details?.state?.name}${
									!!details?.country?.name && ","
								} ${details?.country?.name}`}
							</p>
						)}
					</div>
				</div>
				<div className="max-w-52 w-full">
					<div className="flex justify-between items-center mb-2">
						<div className="flex gap-1 items-center text-xs font-extralight">
							<img src={member} className="h-5" />
							<span>Member since</span>
						</div>
						<p className="text-xs font-semibold">
							{formatDate(details.createdAt)}
						</p>
					</div>
					{/* <div>
						<div className="flex gap-1 items-center text-xs font-bold justify-between mb-2">
							<span>Business Location</span>
							<span onClick={() => setOpenLocation(true)}>
								<EditIcon size={0.9} />
							</span>
						</div>
						<p className="text-xs text-gray-400">
							{`${details.address}${!!details?.city?.name && ","} ${
								details?.city?.name
							}${!!details?.state?.name && ","} ${details?.state?.name}${
								!!details?.country?.name && ","
							} ${details?.country?.name}`}
						</p>
					</div> */}
				</div>
			</div>
			<div>
				<div className="flex gap-2 items-center font-bold mb-2">
					<span>About Us</span>{" "}
					<span onClick={() => setOpen(true)}>
						<EditIcon size={0.7} />
					</span>
				</div>
				<p className="text-xs text-gray-400">{details.profileDescription}</p>
			</div>

			{open && <AboutUs open={open} handleClose={() => setOpen(false)} />}

			{openLocation && (
				<BusinessLocation
					open={openLocation}
					handleClose={() => setOpenLocation(false)}
				/>
			)}

			{openPic && (
				<UploadProfilePicModal
					open={openPic}
					handleClose={() => setOpenPic(false)}
					picture={details.profilePicture ?? avatar}
				/>
			)}
		</div>
	);
}
