import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { func } from "prop-types";
import { BaseTextArea } from "../../../component/text-area";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";

export function DeleteAccount({ goBack }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [reason, setReason] = useState("");

	const deleteAccount = () => {
		setLoading(true);
		profileAxios
			.delete("/profile/delete-accout", {
				reason,
			})
			.then(() => {
				toast.success("Account Deleted Successfully!");
				setTimeout(() => {
					dispatch(logout());
				}, 1500);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<div>
			{loading && <Overlay message="Deleting account" />}
			<div className="text-xs flex gap-4 items-center">
				<div className="bg-black p-1.5 rounded-full w-fit" onClick={goBack}>
					<IoArrowBack className="text-white" />
				</div>
				<div className="p-2 px-4 rounded-full border bg-gray-50 text-red-500 font-bold w-fit select-none">
					Delete Account
				</div>
			</div>

			{step === 1 && (
				<form className="grid grid-cols-1 gap-4 mt-4">
					<div className="text-xs text-gray-400">
						Are you sure you want to delete your account?
					</div>
					<div>
						<div className="mb-4">
							<button
								className="p-3 rounded-md w-full bg-gray-100 font-bold text-sm border"
								type="button"
								onClick={goBack}
							>
								No
							</button>
						</div>
						<div>
							<button
								className="p-3 rounded-md w-full bg-[#FFD2CF] text-[#FF0202] font-bold text-sm"
								type="button"
								onClick={() => setStep(2)}
							>
								Yes
							</button>
						</div>
					</div>
				</form>
			)}

			{step === 2 && (
				<form className="grid grid-cols-1 gap-4 mt-4">
					<div className="text-xs text-gray-400">
						It is sad to see you go, to provide better services, can you leave a
						comment to help understand why you are deleting JobsPro
					</div>
					<div>
						<div className="mb-4">
							<BaseTextArea
								value={reason}
								onChange={(e) => setReason(e.target.value)}
							/>
						</div>
						<div>
							<button
								className="p-3 rounded-md w-full bg-gray-100 font-bold text-sm border"
								type="button"
								onClick={deleteAccount}
							>
								Delete Account
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}

DeleteAccount.propTypes = {
	goBack: func.isRequired,
};
