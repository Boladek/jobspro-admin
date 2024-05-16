import { useState } from "react";
import { Modal } from "../../component/modal";
import info from "../../assets/info.png";
import illustration from "../../assets/illustration.png";
import { BaseButton } from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const [open, setOpen] = useState(true);

	const handleNavigate = () => {
		navigate(`/dashboard/profile/${user.userType}`);
	};

	return (
		<div>
			{open && (
				<Modal open={open} handleClose={() => setOpen(false)}>
					<div className="w-full p-2">
						<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
							<div>
								<img src={illustration} alt="Illustration" />
							</div>
							<p className={`font-bold text-black`}>Hey FirstName</p>
							<p className="text-xs text-gray-500 text-center">
								Please click Get started to complete the setup your profile
							</p>
						</div>
						<div className="flex gap-1 items-center border rounded-md p-2 mb-4">
							<img src={info} alt="Information" />
							<div className="w-4/5 text-xs text-gray-500">
								You only need 1-2 minutes, and you can make edits later.
								We&lsquo;ll save your progress as you go.
							</div>
						</div>
						<div className="flex gap-2">
							<div className="mb-4 w-1/2">
								<BaseButton variant="sec" onClick={() => setOpen(false)}>
									Skip
								</BaseButton>
							</div>
							<div className="mb-4 w-1/2">
								<BaseButton onClick={handleNavigate}>Get Started</BaseButton>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}

export default LandingPage;
