import { useState } from "react";
import { colors } from "../../helpers/theme";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../../component/modal";
import tick from "../../assets/tick.png";
import eye from "../../assets/eye.png";
import eyeSlash from "../../assets/eye-slash.png";
import { Overlay } from "../../component/overlay-component";
import customAxios from "../../helpers/customAxios";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";

function ResetPasswordPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const email = location.state.info || "";
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState(true);
	const [passwordText, setPasswordText] = useState("");
	const [confirmPasswordText, setConfirmPasswordText] = useState("");
	const [otp, setOtp] = useState("");

	const [specialCharCheck, setSpecialCharCheck] = useState(false);
	const [numberCharCheck, setNumberCharCheck] = useState(false);
	const [capitalCheck, setCapitalCheck] = useState(false);
	const isUpperCase = (string) => /[A-Z]/.test(string);

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			!specialCharCheck ||
			!numberCharCheck ||
			!isUpperCase(passwordText) ||
			!capitalCheck
		) {
			toast.error(
				"Please ensure that the password passes the valid character criteria"
			);
			return;
		}
		if (passwordText !== confirmPasswordText) {
			toast.error("Please ensure that the password and confirm password match");
			return;
		}
		setLoading(true);
		customAxios
			.post("/auth/verifyForgetPassword", {
				email: email,
				otp: otp,
				password: passwordText,
			})
			.then((res) => {
				toast.success(res.message);
				navigate("/");
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setSpecialCharCheck(checkForSpecialChar(value));
		setNumberCharCheck(checkForNumber(value));
		setCapitalCheck(isUpperCase(value));
		setPasswordText(value);
	};

	const handleConfirmPasswordChange = (e) => {
		const value = e.target.value;
		setSpecialCharCheck(checkForSpecialChar(value));
		setNumberCharCheck(checkForNumber(value));
		setCapitalCheck(isUpperCase(value));
		setConfirmPasswordText(value);
	};

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={onSubmit}
		>
			{loading && <Overlay />}
			<p className={`text-primary text-3xl font-bold`}>Reset Password</p>
			<p className="text-sm text-gray-500">
				Insert your registered email or phone number
			</p>
			<br />
			<div className="mb-4">
				<OtpInput
					value={otp}
					onChange={setOtp}
					numInputs={6}
					containerStyle="otp-container"
					inputStyle="otp-input"
					required
					renderInput={(props) => <input {...props} />}
				/>
			</div>
			<div className="relative mb-4">
				<BaseInput
					label="Email Address"
					value={email}
					minLength="6"
					maxLength="6"
					required
				/>
			</div>
			{/* <div className="relative mb-4">
				<BaseInput
					label="OTP"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
			</div> */}

			<div className="relative mb-4">
				<BaseInput
					label="New Password"
					onChange={handleChange}
					value={passwordText}
					type={password ? "password" : "text"}
					required
				/>
				<img
					src={password ? eye : eyeSlash}
					onClick={() => setPassword(!password)}
					className={`absolute cursor-pointer ${
						password ? "h-5" : "h-7"
					} transition-all ease-linear duration-300`}
					style={{
						top: password ? "2.5rem" : "2.25rem",
						right: "1rem",
					}}
				/>
			</div>
			<div className="relative mb-2">
				<BaseInput
					label="Confirm Password"
					onChange={handleConfirmPasswordChange}
					value={confirmPasswordText}
					type={confirmPassword ? "password" : "text"}
					required
				/>
				<img
					src={confirmPassword ? eye : eyeSlash}
					onClick={() => setConfirmPassword(!confirmPassword)}
					className={`absolute cursor-pointer ${
						confirmPassword ? "h-5" : "h-7"
					} transition-all ease-linear duration-300`}
					style={{
						top: confirmPassword ? "2.5rem" : "2.25rem",
						right: "1rem",
					}}
				/>
			</div>
			<div className="mb-8 italic">
				<p
					className="text-xs"
					style={{ color: passwordText.length >= 6 ? colors.primary : "red" }}
				>
					At least 6 characters.
				</p>
				<p
					className="text-xs"
					style={{ color: capitalCheck ? colors.primary : "red" }}
				>
					A minimum of 1 upper case
				</p>
				<p
					className="text-xs"
					style={{ color: numberCharCheck ? colors.primary : "red" }}
				>
					1 numeric character [0-9]
				</p>
				<p
					className="text-xs"
					style={{ color: specialCharCheck ? colors.primary : "red" }}
				>
					A minimum of 1 special character: ~`!@#$%^&*()-_+={}[]
				</p>
				<p
					className="text-xs"
					style={{
						color:
							passwordText === confirmPasswordText ? colors.primary : "red",
					}}
				>
					Password and Confirm Password Match
				</p>
			</div>
			<div className="mb-4">
				<BaseButton type="submit">Submit</BaseButton>
			</div>

			{open && (
				<Modal open={open} handleClose={() => setOpen(false)}>
					<div className="w-full p-2">
						<div className="flex flex-col items-center gap-2 mb-4">
							<div>
								<img src={tick} alt="success" />
							</div>
							<p className={`text-primary text-3xl font-bold`}>Congrats</p>
							<p className="text-xs text-gray-500">E don complete</p>
						</div>
						<div className="mb-4">
							<BaseButton>Done</BaseButton>
						</div>
					</div>
				</Modal>
			)}
		</form>
	);
}

export default ResetPasswordPage;

function checkForSpecialChar(string) {
	const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
	for (let i = 0; i < specialChars.length; i++) {
		if (string.indexOf(specialChars[i]) > -1) {
			return true;
		}
	}
	return false;
}

function checkForNumber(string) {
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(Number(string[i]))) return true;
	}
	return false;
}
