import { useState } from "react";
import avatar from "../../../assets/profile-avatar.png";
// import check from "../../../assets/tick-circle.png";
// import plane from "../../../assets/plane.png";
import member from "../../../assets/member.png";
// import { EditIcon } from "../../../assets/edit-icon";
import { useSelector } from "react-redux";
// import { BaseButton } from "../../../component/button";
import { StarIcon } from "../../../assets/admin/star-icon";
import camera from "../../../assets/camera.png";
import { UploadProfilePicModal } from "../../../component/upload-pic-modal";
import { UseAuth } from "../../../context/auth-context";
import { formatDate } from "../../../helpers/function";

export function ProHeadSection() {
	const { user } = useSelector((state) => state.auth);
	const [open, setOpen] = useState(false);
	const { user: details } = UseAuth();

	return (
		<>
			<div className="px-4 py-2 relative">
				<div className="absolute h-20 w-20 overflow-hidden -top-10 border-4 border-white rounded-full shadow-sm">
					<div
						className="absolute opacity-0 hover:opacity-100 w-full h-full hover:bg-black/50 rounded-full flex justify-center items-center cursor-pointer"
						onClick={() => setOpen(true)}
					>
						<img src={camera} className="h-6" alt="Camera Icon" />
					</div>
					<img
						src={details.profilePicture ?? avatar}
						alt="user avatar"
						className="h-full w-full"
					/>
				</div>
				<div className="flex justify-between mt-10">
					<div>
						{/* <div className="flex gap-2 items-center">
							<span className="mb-2 text-sm">
								{user.lastName
									? `${user?.firstName} ${user?.lastName}`
									: user.businessName || "N/A"}
							</span>
							<img src={check} alt="Check alt" className="h-5" />
							<EditIcon size={0.8} />
						</div> */}
						<div className="mb-2">
							<span className="p-2 px-3 rounded-full text-xs capitalize bg-[#42BE65] text-white">
								{user?.userType}
							</span>
							<div className="flex gap-1 items-center text-xs font-light text-gray-500 mt-2">
								<StarIcon />
								<span>5.0(900)</span>
							</div>
							<p className="text-xs text-gray-400 mt-1">Completion rate: 98%</p>
						</div>
						<div className="flex justify-between items-center mb-2 gap-1">
							<div className="flex gap-1 items-center text-xs font-extralight">
								<img src={member} className="h-5" />
								<span>Member since</span>
							</div>
							<p className="text-xs font-semibold">
								{formatDate(details.createdAt)}
							</p>
						</div>
					</div>
					{/* <div className="max-w-52 w-full">
						<div className="flex justify-between items-center mb-2">
							<div className="flex gap-1 items-center text-xs font-extralight">
								<img src={member} className="h-5" />
								<span>Member since</span>
							</div>
							<p className="text-xs font-semibold">
								{formatDate(details.createdAt)}
							</p>
						</div>
						<div>
							<BaseButton size="small" variant="sec">
								Preview Profile
							</BaseButton>
						</div>
					</div> */}
				</div>
			</div>

			{open && (
				<UploadProfilePicModal
					open={open}
					handleClose={() => setOpen(false)}
					picture={details.profilePicture ?? avatar}
				/>
			)}
		</>
	);
}
