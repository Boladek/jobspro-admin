import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { colors } from "../../helpers/theme";
import OtpInput from "react-otp-input";

function VerifyEmailPage() {
	const navigate = useNavigate();
	const location = useLocation();
	// console.log({ location });
	const [otp, setOtp] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		navigate("/reset-password", {
			state: {
				otp,
			},
		});
	};

	// console.log({ otp });

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={onSubmit}
		>
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				Verify Email Address
			</p>
			<p className="text-sm text-gray-500">
				Enter the OTP sent to {location.state.info}
			</p>
			<br />
			<div className="mb-8">
				<OtpInput
					value={otp}
					onChange={setOtp}
					numInputs={4}
					containerStyle="otp-container"
					inputStyle="otp-input"
					inputType="number"
					required
					// renderSeparator={<span>-</span>}
					renderInput={(props) => <input {...props} />}
				/>
			</div>
			<div className="mb-4">
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

export default VerifyEmailPage;
