import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseButton } from "../../component/button";
import OtpInput from "react-otp-input";
import { TimerHook } from "../../hooks/timer-hooks";

function VerifyEmailPage() {
	// eslint-disable-next-line no-unused-vars
	const { email } = useParams();
	const navigate = useNavigate();
	const { timer } = TimerHook({ time: 60 });
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
			<p className={`text-primary text-3xl font-bold`}>Verify Email Address</p>
			<p className="text-sm text-gray-500">
				Enter the OTP sent to email@example.com
			</p>
			<br />
			<div className="mb-4">
				<OtpInput
					value={otp}
					onChange={setOtp}
					numInputs={4}
					containerStyle="otp-container"
					inputStyle="otp-input"
					required
					// renderSeparator={<span>-</span>}
					renderInput={(props) => <input {...props} />}
				/>
			</div>
			<p className={`text-primary text-xs mb-8 text-center cursor-default`}>
				Request a new code <span className="text-[#42BE65]">{timer}s</span>
			</p>
			<div className="mb-4">
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

export default VerifyEmailPage;
