import OtpInput from "react-otp-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { TimerHook } from "../../../hooks/timer-hooks";

export function VerifyPhoneNumber() {
	const { timer } = TimerHook({ time: 15 });
	const [otp, setOtp] = useState("");
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		console.log({ data });
	};

	return (
		<div
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
		>
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div style={{ maxWidth: 400, width: "100%" }}>
					<p className={`text-[${colors.primary}] text-3xl font-bold`}>
						Verify Phone Number
					</p>
					<p className="text-sm text-gray-500 mb-4">
						Enter the OTP sent to 07036723061
					</p>
					<div className="border rounded-xl p-6 mb-4">
						<div className="mb-2">
							<div className="mb-4">
								<OtpInput
									value={otp}
									onChange={setOtp}
									numInputs={4}
									containerStyle="otp-container"
									inputStyle="otp-input"
									// inputType="number"
									required
									// renderSeparator={<span>-</span>}
									renderInput={(props) => <input {...props} />}
								/>
							</div>
						</div>
						<p className="text-xs text-gray-600 text-center">
							Request a new code{" "}
							<span className="text-[#42BE65]">in {timer}s</span>
						</p>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec">Previous</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button">Next</BaseButton>
				</div>
			</div>
		</div>
	);
}

VerifyPhoneNumber.propTypes = {
	gotoNext: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
