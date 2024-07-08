import { useState } from "react";
import { Modal } from "../../../component/modal";
import { SquareButton } from "../../../component/square-button";
import OtpInput from "react-otp-input";
import PropTypes from "prop-types";
import { TimerHook } from "../../../hooks/timer-hooks";
import { SuccessInfo } from "../../../component/success-info";

export function ConfirmPassworOtp({ open, handleClose }) {
	const [step, setStep] = useState(1);
	const [otp, setOtp] = useState("");
	const { timer } = TimerHook({ time: 60 });

	return (
		<Modal open={open} handleClose={handleClose}>
			{step === 1 && (
				<form className="w-full p-2">
					<p className="font-bold text-primary">Enter OTP</p>
					<p className="mb-8 text-xs">
						A code was sent to your phone number, code expires in{" "}
						<span className="text-[#42BE65] font-bold">in {timer}s</span>
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
						<SquareButton>Confirm OTP</SquareButton>
					</div>
				</form>
			)}
			{step === 2 && (
				<div className="py-4">
					<SuccessInfo message="Password updated successfully!" />
				</div>
			)}
		</Modal>
	);
}

ConfirmPassworOtp.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
};
