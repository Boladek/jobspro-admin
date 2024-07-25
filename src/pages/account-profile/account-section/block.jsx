import { IoArrowBack } from "react-icons/io5";
import { func } from "prop-types";
import profileAxios from "../../../helpers/profileAxios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";

export function BlockAccount({ goBack }) {
	const [loading, setLoading] = useState(false);

	const blockAccount = () => {
		setLoading(true);
		profileAxios
			.post("/profile/block-accout", {})
			.then(() => {
				toast.success("Account successfully blocked!");
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<div>
			{loading && <Overlay message="Blocking account" />}
			<div className="text-xs flex gap-4 items-center">
				<div className="bg-black p-1.5 rounded-full w-fit" onClick={goBack}>
					<IoArrowBack className="text-white" />
				</div>
				<div className="p-2 px-4 rounded-full border bg-gray-50 text-adminPrimary font-bold w-fit select-none">
					Block my account
				</div>
			</div>

			<form className="grid grid-cols-1 gap-4 mt-4">
				<div className="text-xs text-gray-400">
					Please proceed with this action, if you feel your account may be
					compromised
				</div>
				<div>
					<div>
						<div className="mb-4">
							<button
								className="p-3 rounded-md w-full bg-gray-100 font-bold text-sm border"
								type="button"
								onClick={goBack}
							>
								Cancel
							</button>
						</div>
						<div>
							<button
								className="p-3 rounded-md w-full bg-[#D2ECFF] text-[#126FB5] font-bold text-sm"
								type="button"
								onClick={blockAccount}
							>
								Proceed
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

BlockAccount.propTypes = {
	goBack: func.isRequired,
};
