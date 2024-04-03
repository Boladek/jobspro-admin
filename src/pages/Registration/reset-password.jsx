import React, { useState } from "react";
import { colors } from "../../helpers/theme";
import { BaseInput } from "../../component/input";
import { BaseButton } from "../../component/button";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../component/modal";
import tick from "../../assets/tick.png";

function ResetPasswordPage() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState(true);
	const [passwordText, setPasswordText] = useState("");
	const [confirmPasswordText, setConfirmPasswordText] = useState("");

	const [specialCharCheck, setSpecialCharCheck] = useState(false);
	const [numberCharCheck, setNumberCharCheck] = useState(false);
	// const [passwordCheck, setPasswordCheck] = useState(false);
	const [capitalCheck, setCapitalCheck] = useState(false);
	const isUpperCase = (string) => /[A-Z]/.test(string);

	const onSubmit = (e) => {
		e.preventDefault();
		setOpen(true);
		// navigate("/verify-email", {
		// 	state: {
		// 		info,
		// 	},
		// });
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setSpecialCharCheck(checkForSpecialChar(value));
		setNumberCharCheck(checkForNumber(value));
		setCapitalCheck(isUpperCase(value));
		// setPasswordCheck(value.length >= 6);
		setPasswordText(value);
	};

	const handleConfirmPasswordChange = (e) => {
		const value = e.target.value;
		setSpecialCharCheck(checkForSpecialChar(value));
		setNumberCharCheck(checkForNumber(value));
		setCapitalCheck(isUpperCase(value));
		// setPasswordCheck(value.length >= 6);
		setConfirmPasswordText(value);
	};

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="py-6 px-4"
			onSubmit={onSubmit}
		>
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				Reset Password
			</p>
			<p className="text-sm text-gray-500">
				Insert your registered email or phone number
			</p>
			<br />
			<div className="relative mb-4">
				<BaseInput
					label="New Password"
					onChange={handleChange}
					value={passwordText}
					type={password ? "password" : "text"}
				/>
				<span
					className="absolute right-4 top-2/3 transform -translate-y-1/2 material-symbols-outlined cursor-pointer  text-2xl"
					onClick={() => setPassword(!password)}
				>
					{password ? "visibility" : "visibility_off"}
				</span>
			</div>
			<div className="relative mb-2">
				<BaseInput
					label="Confirm Password"
					onChange={handleConfirmPasswordChange}
					value={confirmPasswordText}
					type={confirmPassword ? "password" : "text"}
				/>
				<span
					className="absolute right-4 top-2/3 transform -translate-y-1/2 material-symbols-outlined cursor-pointer  text-2xl"
					onClick={() => setConfirmPassword(!confirmPassword)}
				>
					{confirmPassword ? "visibility" : "visibility_off"}
				</span>
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
							<p className={`text-[${colors.primary}] text-3xl font-bold`}>
								Congrats
							</p>
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

export function checkForSpecialChar(string) {
	const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
	for (let i = 0; i < specialChars.length; i++) {
		if (string.indexOf(specialChars[i]) > -1) {
			return true;
		}
	}
	return false;
}

export function checkForNumber(string) {
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(Number(string[i]))) return true;
	}
	return false;
}
