import { useForm } from "react-hook-form";
import { BaseInput } from "../../../component/input";
import { SquareButton } from "../../../component/square-button";
import { useState } from "react";
import { ConfirmPassworOtp } from "./confirm-password-otp";
import { toast } from "react-toastify";
import customAxios from "../../../helpers/customAxios";
import { UseAuth } from "../../../context/auth-context";
import { Overlay } from "../../../component/overlay-component";

export function PasswordReset() {
	const { user } = UseAuth();
	const [loading, setLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const watchNewPassword = watch("newPassword", "");
	const watchConfirmPassword = watch("confirmPassword");
	const [formData, setFormData] = useState(null);

	const [open, setOpen] = useState(false);

	const onSubmit = (data) => {
		if (data.newPassword.length < 6) {
			toast.error("Passwords must contain at least 6 characters");
			return;
		}
		if (!isUpperCase(data.newPassword)) {
			toast.error("Passwords must contain at least one uppercase letter");
			return;
		}
		if (!checkForNumber(data.newPassword)) {
			toast.error("Passwords must contain at least one number");
			return;
		}
		if (!checkForSpecialChar(data.newPassword)) {
			toast.error("Passwords must contain at least one special character");
			return;
		}
		if (data.newPassword !== data.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		setFormData(data);
		setLoading(true);
		customAxios
			.post("/auth/initiate-change-password", {
				oldPassword: data.prevPassword,
				newPassword: data.newPassword,
			})
			.then((res) => {
				toast.success(res.message);
				setOpen(true);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<form
			className="grid grid-cols-1 gap-4 py-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			{loading && <Overlay message="Initiating Password Reset" />}
			<div>
				<BaseInput
					label="Previous Password"
					{...register("prevPassword", {
						required: "This field is required",
					})}
					error={errors.prevPassword}
					errorText={errors.prevPassword && errors.prevPassword.message}
				/>
			</div>
			<div>
				<BaseInput
					label="New Password"
					{...register("newPassword", {
						required: "This field is required",
					})}
					error={errors.newPassword}
					errorText={errors.newPassword && errors.newPassword.message}
				/>
			</div>
			<div>
				<BaseInput
					label="Confirm Password"
					{...register("confirmPassword", {
						required: "This field is required",
					})}
					error={errors.confirmPassword}
					errorText={errors.confirmPassword && errors.confirmPassword.message}
				/>
			</div>
			<div className="mb-4 italic">
				<p
					className="text-xs"
					style={{ color: watchNewPassword.length >= 6 ? "#206DB0" : "red" }}
				>
					At least 6 characters.
				</p>
				<p
					className="text-xs"
					style={{ color: isUpperCase(watchNewPassword) ? "#206DB0" : "red" }}
				>
					A minimum of 1 upper case
				</p>
				<p
					className="text-xs"
					style={{
						color: checkForNumber(watchNewPassword) ? "#206DB0" : "red",
					}}
				>
					1 numeric character [0-9]
				</p>
				<p
					className="text-xs"
					style={{
						color: checkForSpecialChar(watchNewPassword) ? "#206DB0" : "red",
					}}
				>
					A minimum of 1 special character: ~`!@#$%^&*()-_+={}[]
				</p>
				<p
					className="text-xs"
					style={{
						color:
							watchNewPassword === watchConfirmPassword ? "#206DB0" : "red",
					}}
				>
					Password and Confirm Password Match
				</p>
			</div>
			<div className="">
				<SquareButton type="submit">Update Password</SquareButton>
			</div>
			{open && (
				<ConfirmPassworOtp
					open={open}
					handleClose={() => setOpen(false)}
					data={formData}
				/>
			)}
		</form>
	);
}

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

function isUpperCase(string) {
	return /[A-Z]/.test(string);
}
