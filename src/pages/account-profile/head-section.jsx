import { UseAuth } from "../../context/auth-context";
import avatar from "../../assets/profile-avatar.png";
import camera from "../../assets/camera.png";
import { IoIosCopy } from "react-icons/io";
import { useState } from "react";
import { UploadProfilePicModal } from "../../component/upload-pic-modal";
import { Switch } from "../../component/switch";
import { UseKyc } from "../../context/kyc-context";
// import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../helpers/profileAxios";
import { toast } from "react-toastify";

export function HeadSection() {
	const { name, user, refetch } = UseAuth();
	const { tier } = UseKyc();
	const [open, setOpen] = useState(false);

	const toggleAviability = () => {
		profileAxios
			.patch("/profile/toggle-availability")
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message));
	};

	return (
		<>
			<div className="p-8 bg-[#4440FF] flex justify-between items-center text-white">
				<div className="flex gap-2 items-center">
					<div className="h-20 w-20 relative overflow-hidden border-4 border-white rounded-full shadow-sm">
						<div
							className="absolute top-0 left-0 opacity-0 hover:opacity-100 w-full h-full hover:bg-black/50 rounded-full flex justify-center items-center cursor-pointer"
							onClick={() => setOpen(true)}
						>
							<img src={camera} className="h-6" alt="Camera Icon" />
						</div>
						<img
							src={user?.profilePicture ?? avatar}
							alt="user avatar"
							className="h-full w-full"
						/>
					</div>
					<div>
						<p className="text-sm font-semibold mb-1">{name}</p>
						<div className="text-xs flex items-center gap-1">
							<span className="font-extralight">Finclusion ID:</span>
							<span className="font-semibold">{user.finclusionId}</span>
							<IoIosCopy className="text-base" />
						</div>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					{user.userType !== "business" && (
						<>
							<span className="text-xs font-extralight">Availability</span>
							<div>
								<Switch
									checked={user.availability}
									handleChecked={toggleAviability}
									color="#0FFF9A"
								/>
							</div>
						</>
					)}
					<span className="px-5 py-2 rounded-full bg-white text-adminPrimary text-xs capitalize font-semibold shadow-sm">
						Tier {tier}
					</span>
				</div>
			</div>
			{open && (
				<UploadProfilePicModal
					open={open}
					handleClose={() => setOpen(false)}
					picture={user.profilePicture ?? avatar}
				/>
			)}
		</>
	);
}
