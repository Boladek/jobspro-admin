import React from "react";
import { UseAuth } from "../../../../context/auth-context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import kycAxios from "../../../../helpers/kycAxios";
import { BaseInput } from "../../../../component/input";
import { SquareButton } from "../../../../component/square-button";
import { func } from "prop-types";
import { Overlay } from "../../../../component/overlay-component";
import OtpInput from "react-otp-input";
import { TimerHook } from "../../../../hooks/timer-hooks";

export function BvnOTP({ gotoNextPage, handleBVN, goBack, bvn }) {
	const { timer } = TimerHook({ time: 60 });
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		kycAxios
			.post("/kyc/verify-bvn", {
				otp: otp,
				bvn: bvn,
			})
			.then((res) => {
				// console.log(res);
				toast.success(res.message);
				// handleBVN(data.bvn);
				gotoNextPage();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<form className="w-full p-2" onSubmit={onSubmit}>
			{loading && <Overlay message="Verifying OTP" />}
			<div className="flex justify-end">
				<span
					onClick={goBack}
					className="hover:underline text-gray-500 text-sm capitalize cursor-pointer"
				>
					back
				</span>
			</div>
			<p className="font-bold text-primary">Enter OTP</p>
			<p className="mb-8 text-xs">
				A code was sent to your registered email address, code expires in{" "}
				<span className="text-[#42BE65] font-bold">{timer}s</span>
			</p>
			<div className="mb-8">
				<OtpInput
					value={otp}
					onChange={setOtp}
					numInputs={6}
					containerStyle="otp-container"
					inputStyle="otp-input"
					required
					renderInput={(props) => <input required {...props} />}
				/>
			</div>
			<div className="mb-4">
				<SquareButton type="submit" loading={loading}>
					Verify BVN
				</SquareButton>
			</div>
		</form>
	);
}

BvnOTP.propTypes = {
	gotoNextPage: func,
	handleBVN: func,
	goBack: func,
};
