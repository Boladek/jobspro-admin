import { bool, func, object } from "prop-types";
import { Modal } from "../../../../component/modal";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { SquareButton } from "../../../../component/square-button";
import { Overlay } from "../../../../component/overlay-component";
import { TimerHook } from "../../../../hooks/timer-hooks";
import { SuccessInfo } from "../../../../component/success-info";
import { toast } from "react-toastify";
import profileAxios from "../../../../helpers/profileAxios";
import { NotificationsHook } from "../../../../hooks/notifications-hook";

export function PaymentOtp({ open, handleClose, gig, openReview }) {
	const { refetchNotifications } = NotificationsHook();
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState(1);
	const [otp, setOtp] = useState("");
	const { timer } = TimerHook({ time: 60 });

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);
		profileAxios
			.post(`/gigs/mark-completed/${gig?.gigAccepted[0]?.uuid}`)
			.then((res) => {
				toast.success(res.message);
				openReview();
				refetchNotifications();
				setStep(2);
				setTimeout(() => {
					handleClose();
				}, 3000);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			{step === 1 && (
				<form className="p-4 h-full flex flex-col" onSubmit={submit}>
					{loading && <Overlay message="Paying Pro" />}
					<p className={`text-primary text-3xl font-bold mb-4`}>Enter OTP</p>
					<p className="text-sm text-gray-500 mb-4">
						A code was sent to your phone number, code expires{" "}
						<span className="text-[#42BE65] font-bold">in {timer}s</span>
					</p>
					<div className="mb-4">
						<OtpInput
							value={otp}
							onChange={setOtp}
							numInputs={6}
							containerStyle="otp-container"
							inputStyle="otp-input"
							// inputType="number"
							// renderSeparator={<span>-</span>}
							renderInput={(props) => <input required {...props} />}
						/>
					</div>
					<div className="mb-8 text-xs font-bold hover:underline text-gray-500 cursor-pointer">
						Resend otp
					</div>
					<div>
						<SquareButton type="submit">Pay Pro</SquareButton>
					</div>
				</form>
			)}
			{step === 2 && <SuccessInfo message="Payment Successful!" />}
		</Modal>
	);
}

PaymentOtp.propTypes = {
	open: bool.isRequired,
	handleClose: func.isRequired, // Proper usage of PropTypes
	gig: object,
	openReview: func,
};
