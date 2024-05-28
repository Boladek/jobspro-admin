import { useState } from "react";
import PropTypes from "prop-types";
// import React from "react";
import { Modal } from "../../../component/modal";
// import { BaseInput } from "../../../component/input";
// import { BaseSelect } from "../../../component/select";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import { formatNumber } from "../../../helpers/function";
import profileAxios from "../../../helpers/profileAxios";
import { Overlay } from "../../../component/overlay-component";
import { toast } from "react-toastify";
import { UseAuth } from "../../../context/auth-context";

export function WorkingRate({ open, handleClose }) {
	const { refetch } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [fee, setFee] = useState("");

	const handleFee = (e) => {
		const { value } = e.target;
		setFee(value);
	};

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);
		profileAxios
			.patch("profile/working-rate", {
				workingRateType: "daily",
				workingRateAmount: Number(fee),
				currency: "NGN",
			})
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Setting Work Rate" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form className="w-full p-2" onSubmit={submit}>
					<p className="font-bold text-primary text-2xl">Working Rate</p>
					<p className="text-xs text-gray-400">
						More information should be placed here
					</p>
					<br />
					<div className="mb-6">
						<BaseInput
							label="Enter Rate"
							value={fee}
							onChange={handleFee}
							type="number"
						/>
					</div>
					{/* <div className="mb-4">
					<p className="text-xs text-gray-700">Service Fee(10%)</p>
					<p className="font-bold text-lg">NGN {formatNumber(fee / 10)}</p>
				</div> */}
					<hr />
					<div className="mt-4">
						<p className="text-xs text-gray-700">Amount you&apos;ll receive</p>
						<p className="font-bold text-lg">
							NGN {formatNumber(fee - fee / 10)}/ Daily
						</p>
					</div>

					<div className="flex gap-2 mt-4">
						<div className="w-1/2">
							<BaseButton variant="sec" type="button" onClick={handleClose}>
								Cancel
							</BaseButton>
						</div>
						<div className="w-1/2" type="submit">
							<BaseButton>Save</BaseButton>
						</div>
					</div>
				</form>
			</Modal>
		</>
	);
}

WorkingRate.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
