// import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import { useState } from "react";
import { formatNumber } from "../../../helpers/function";
import { toast } from "react-toastify";
import profileAxios from "../../../helpers/profileAxios";
import { Overlay } from "../../../component/overlay-component";

export function WorkingRate({ gotoPrevious, gotoNextStep }) {
	const [fee, setFee] = useState("");
	const [loading, setLoading] = useState(false);

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
				gotoNextStep();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<form
			className="p-4 h-full flex flex-col"
			divtyle={{ maxWidth: 500, width: "100%" }}
			onSubmit={submit}
		>
			{loading && <Overlay message="Updating Work Rate" />}
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div style={{ maxWidth: 500, width: "100%" }}>
					<p className={`text-primary text-3xl font-bold`}>Working rate</p>
					<p className="text-sm text-gray-500 mb-4">
						More information should be placed here
					</p>
					<div className="border rounded-md p-6 mb-4">
						{/* <div className="flex gap-3 w-3/5 mb-4">
							{["hourly", "daily"].map((item) => (
								<div
									key={item}
									// onClick={() => handleNavigate(item)}
									className={`capitalize p-2 flex-1 border-2 border-[#206DB0] text-primary rounded-full text-center hover:bg-[#206DB0] hover:text-white cursor-pointer font-bold`}
								>
									{item}
								</div>
							))}
						</div> */}
						<div className="mb-2">
							<BaseInput
								label="Enter Rate"
								value={fee}
								onChange={handleFee}
								type="number"
							/>
						</div>
					</div>
					<div>
						{/* <div className="mb-2">
							<p className="text-xs">Service Fee(10%)</p>
							<p className="font-bold text-2xl">NGN 200</p>
						</div> */}
						<hr />
						<div className="mt-4">
							<p className="text-xs text-gray-700">
								Amount you&apos;ll receive
							</p>
							<p className="font-bold text-lg">
								NGN {formatNumber(fee - fee / 10)}/ Daily
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec" onClick={gotoPrevious}>
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="submit">Next</BaseButton>
				</div>
			</div>
		</form>
	);
}

WorkingRate.propTypes = {
	gotoNextStep: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
