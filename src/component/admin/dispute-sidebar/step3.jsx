import { useState } from "react";
import { ProgressBar } from "../progress-bar";
import PropTypes from "prop-types";
import { formatNumber } from "../../../helpers/function";
import { TiimeLineBox } from "../../time-line-box";
import { BaseInput } from "../../input";
import { BaseSelect } from "../../select";
import OtpInput from "react-otp-input";
import { SquareButton } from "../../square-button";
import { NoInfo } from "../../no-info";
import { SuccessInfo } from "../../success-info";

export function Step3({ goBack }) {
	const [step, setStep] = useState(2);
	const [otp, setOtp] = useState("");
	return (
		<>
			<div className="max-w-[400px] w-full">
				<div className="text-white bg-adminPrimary p-2 rounded-md text-sm text-center mb-4">
					Facilitating manual transfer payment between
				</div>
				<div className="text-xs bg-[#FFFAEF] p-4 rounded-md mb-4">
					<p className="font-bold">Note</p>
					<p className="font-extralight">
						You are about to transfer the sum of NGN 12,000 from GIG’s escrow
						account to Okeke Chima’s wallet
					</p>
				</div>
				<div className="flex justify-end">
					<span
						onClick={goBack}
						className="text-xs text-gray-500 hover:underline cursor-pointer"
					>
						Back
					</span>
				</div>
				{step === 1 && (
					<form className="grid grid-cols-1 gap-4">
						<div>
							<BaseInput label="Gig Location" />
						</div>
						<div>
							<BaseInput label="Amount to be transferred" />
						</div>
						<div>
							<BaseSelect label="Select payment partner">
								<option>Sterling</option>
							</BaseSelect>
						</div>
						<div className="mb-4">
							<p className="text-[#004D7A] text-sm mb-1">
								Enter Transaction OTP
							</p>
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
						<div>
							<SquareButton type="submit">Pay Pro</SquareButton>
						</div>
					</form>
				)}
				{step === 2 && (
					<div>
						<SuccessInfo message="Pro Payment Successful" />
					</div>
				)}
			</div>
		</>
	);
}

Step3.propTypes = {
	gotoNextStep: PropTypes.func,
	goBack: PropTypes.func,
};
