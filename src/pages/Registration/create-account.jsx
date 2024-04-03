import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BaseInput } from "../../component/input";
import { colors } from "../../helpers/theme";
import { BaseButton } from "../../component/button";
import { BaseSelect } from "../../component/select";

function CreateAccountPage() {
	const { role } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [password, setPassword] = useState(true);
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
			<div className="mb-2">
				<BaseInput
					label="Email or Phone Number"
					{...register("username", {
						required: "This field is required",
					})}
					error={errors.username}
					errorText={errors.username && errors.username.message}
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
					type={password ? "password" : "text"}
					{...register("password", {
						required: "The field is required",
					})}
					error={errors.password}
					errorText={errors.password && errors.password.message}
				/>
				<span
					className="absolute right-4 top-2/3 transform -translate-y-1/2 material-symbols-outlined cursor-pointer  text-2xl"
					onClick={() => setPassword(!password)}
				>
					{password ? "visibility" : "visibility_off"}
				</span>
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
