import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BaseInput } from "../../component/input";
import { colors } from "../../helpers/theme";
import { BaseButton } from "../../component/button";
import { BaseSelect } from "../../component/select";
import eye from "../../assets/eye.png";
import eyeSlash from "../../assets/eye-slash.png";

function CreateAccountPage() {
	const location = useLocation();
	const accountType = location?.state?.accountType || "individual";
	const { role } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [password, setPassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState(true);
	const [remember, setRemember] = useState(false);
	const onSubmit = (data) => {
		console.log({ data });
	};

	return (
		<form
			style={{ maxWidth: 400, width: "100%" }}
			className="px-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				{role === "pros" && "Sign up to a find gig"}
				{role === "customer" && "Sign up to hire Pros"}
				{role === "agent" && "Sign up to manage Pros"}
			</p>
			<p className="text-sm text-gray-500">Let’s get to know you better</p>
			<br />
			{accountType === "business" ? (
				<div className="mb-2">
					<BaseInput
						label="Company Name"
						{...register("companyName", {
							required: "This field is required",
						})}
						error={errors.companyName}
						errorText={errors.companyName && errors.companyName.message}
					/>
				</div>
			) : (
				<>
					<div className="mb-2">
						<BaseInput
							label="First Name"
							{...register("firstName", {
								required: "This field is required",
							})}
							error={errors.firstName}
							errorText={errors.firstName && errors.firstName.message}
						/>
					</div>
					<div className="mb-2">
						<BaseInput
							label="Last Name"
							{...register("lastName", {
								required: "This field is required",
							})}
							error={errors.lastName}
							errorText={errors.lastName && errors.lastName.message}
						/>
					</div>
				</>
			)}

			<div className="mb-2">
				<BaseInput
					label="Email"
					{...register("email", {
						required: "This field is required",
					})}
					error={errors.email}
					errorText={errors.email && errors.email.message}
				/>
			</div>
			<div className="relative mb-2">
				<BaseSelect
					label="Country Code"
					{...register("password", {
						required: "The field is required",
					})}
					error={errors.password}
					errorText={errors.password && errors.password.message}
				>
					<option></option>
					<option></option>
				</BaseSelect>
			</div>
			{accountType !== "business" && (
				<div className="mb-2">
					<BaseInput
						label="Phone Number"
						{...register("phoneNumber", {
							required: "This field is required",
						})}
						error={errors.phoneNumber}
						errorText={errors.phoneNumber && errors.phoneNumber.message}
					/>
				</div>
			)}
			<div className="relative mb-2">
				<BaseInput
					label="Password"
					type={password ? "password" : "text"}
					{...register("password", {
						required: "The field is required",
					})}
					error={errors.password}
					errorText={errors.password && errors.password.message}
				/>
				<img
					src={password ? eye : eyeSlash}
					onClick={() => setPassword(!password)}
					className={`absolute cursor-pointer ${
						password ? "h-5" : "h-7"
					} transition-all duration-300`}
					style={{
						top: password ? "2.5rem" : "2.25rem",
						right: "1rem",
					}}
				/>
			</div>
			<div className="relative mb-2">
				<BaseInput
					label="Confirm Password"
					type={confirmPassword ? "password" : "text"}
					{...register("confirmPassword", {
						required: "The field is required",
					})}
					error={errors.confirmPassword}
					errorText={errors.confirmPassword && errors.confirmPassword.message}
				/>
				<img
					src={confirmPassword ? eye : eyeSlash}
					onClick={() => setConfirmPassword(!confirmPassword)}
					className={`absolute cursor-pointer ${
						confirmPassword ? "h-5" : "h-7"
					} transition-all duration-300`}
					style={{
						top: confirmPassword ? "2.5rem" : "2.25rem",
						right: "1rem",
					}}
				/>
			</div>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<input
						value={remember}
						onChange={(e) => setRemember(e.target.checked)}
						type="checkbox"
						className="form-checkbox h-5 w-5 text-indigo-600 border-indigo-600 rounded"
					/>
					<label className="text-xs">
						Yes, I understand and agree to the {" "}
						<span className={`text-[${colors.primary}] underline`}>
							Upwork Terms of Service
						</span>
						 , including the {" "}
						<span className={`text-[${colors.primary}] underline`}>
							User Agreement
						</span>{" "}
						and {" "}
						<span className={`text-[${colors.primary}] underline`}>
							Privacy Policy
						</span>
						 .
					</label>
				</div>
			</div>
			<div className="">
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

export default CreateAccountPage;
