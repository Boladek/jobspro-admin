import avatar from "../../../assets/profile-avatar.png";
// import check from "../../../assets/tick-circle.png";
import member from "../../../assets/member.png";
import camera from "../../../assets/camera.png";
import { EditIcon } from "../../../assets/edit-icon";
import { useSelector } from "react-redux";
import { UploadProfilePicModal } from "../../../component/upload-pic-modal";
import { useState } from "react";
import { UseAuth } from "../../../context/auth-context";

export function IndividualHeadSection() {
	const { user: details } = UseAuth();
	const { user } = useSelector((state) => state.auth);
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="px-4 py-2 relative mb-2">
				<div className="absolute -top-10 border-4 border-white rounded-full shadow-sm transition-all ease-linear 500">
					<div
						className="absolute opacity-0 hover:opacity-100 w-full h-full hover:bg-black/50 rounded-full flex justify-center items-center cursor-pointer"
						onClick={() => setOpen(true)}
					>
						<img src={camera} className="h-6" alt="Camera Icon" />
					</div>
					<img
						src={details.profilePicture ?? avatar}
						alt="user avatar"
						className="h-20"
					/>
				</div>
				<div className="flex justify-between mt-10 mb-4">
					<div>
						{/* <div className="flex gap-2 items-center mb-1">
							<span>{`${user?.firstName} ${user?.lastName}`}</span>
							<img src={check} alt="Check alt" className="h-5" />
							<EditIcon size={0.8} />
						</div> */}
						<div>
							<span className="p-2 px-3 rounded-full text-xs capitalize bg-[#FFC700] text-dark">
								{user?.userType}
							</span>
							{/* <div className="flex gap-1 items-center text-xs font-light text-gray-500 mt-2">
							<StarIcon />
							<span>5.0(900)</span>
						</div>
						<p className="text-xs text-gray-400 mt-1">Completion rate: 98%</p> */}
						</div>
					</div>
					<div className="max-w-52 w-full">
						<div className="flex justify-between items-center mb-2">
							<div className="flex gap-1 items-center text-xs font-extralight">
								<img src={member} className="h-5" />
								<span>Member since</span>
							</div>
							<p className="text-xs font-semibold">Feb 2024</p>
						</div>
					</div>
				</div>
				<div>
					<div className="flex gap-2 items-center font-bold mb-2">
						<span>Bio</span> <EditIcon size={0.7} />
					</div>
					<p className="text-xs text-gray-400">
						Hey, I’m Tochi. I create delightful products 😍 I&apos;m a Product
						designer with 3+ years of experience and a zest for solving complex
						problems. Proficient with Figma, Adobe XD, illustrator and photoshop
						with extensive knowledge of other UX fields and user psychology. So
						far, I’ve applied myself and brought delight to thousands of people
						across several industries like Finance, Health-tech, Crypto and
						Entertainment.
					</p>
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
