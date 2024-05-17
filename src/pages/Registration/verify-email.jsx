import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BaseButton } from "../../component/button";
import OtpInput from "react-otp-input";
import { TimerHook } from "../../hooks/timer-hooks";
import customAxios from "../../helpers/customAxios";
import { Overlay } from "../../component/overlay-component";
import { toast } from "react-toastify";

function VerifyEmailPage() {
	// eslint-disable-next-line no-unused-vars
	const { email } = useParams();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { timer, resetTimer } = TimerHook({ time: 60 });
	const [otp, setOtp] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		customAxios
			.post("/auth/verify-email-otp", {
				email: email,
				otp: otp,
			})
			.then((res) => {
				toast.success(res.message);
				navigate("/");
			})
			.catch((err) => {
				console.log({ err });
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
		// navigate("/reset-password", {
		// 	state: {
		// 		otp,
		// 	},
		// });
	};

	const resend = () => {
		if (timer <= 0) {
			setLoading(true);
			customAxios
				.post("/auth/send-email-otp", {
					email: email,
				})
				.then(() => {
					toast.success("New OTP sent to your email address");
					resetTimer();
				})
				.finally(() => setLoading(false));
		}
	};

	// console.log({ otp });

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={onSubmit}
		>
			{loading && <Overlay />}
			<p className={`text-primary text-3xl font-bold`}>Verify Email Address</p>
			<p className="text-sm text-gray-500">Enter the OTP sent to {email}</p>
			<br />
			<div className="mb-4">
				<OtpInput
					value={otp}
					onChange={setOtp}
					numInputs={6}
					containerStyle="otp-container"
					inputStyle="otp-input"
					required
					// renderSeparator={<span>-</span>}
					renderInput={(props) => <input {...props} />}
				/>
			</div>
			<p
				className={`text-primary text-xs mb-8 text-center cursor-default`}
				onClick={resend}
			>
				Request a new code <span className="text-[#42BE65]">{timer}s</span>
			</p>
			<div className="mb-4">
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

export default VerifyEmailPage;
