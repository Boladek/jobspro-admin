import { useState } from "react";
import avatar from "../../../../../assets/profile-avatar.png";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { BaseInput } from "../../../../../component/input";
import { useForm } from "react-hook-form";
import { BaseSelect } from "../../../../../component/select";

export function UserSummary({ goBack }) {
	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState(null);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({});

	const handleFile = (e) => {
		const selectedFile = e.target.files[0];
		if (!selectedFile) {
			toast.error("No file selected.");
			return;
		}

		// Validate file type
		const validImageTypes = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/jpg",
			"image/jpe",
			"image/jfif",
			"application/pdf",
		];
		if (!validImageTypes.includes(selectedFile.type)) {
			toast.error("Please select a valid image file (JPEG, JPG, PNG, GIF).");
			return;
		}

		// Validate file size
		const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
		if (selectedFile.size > maxSizeInBytes) {
			toast.error("File size must be less than 1MB.");
			return;
		}

		// Clear previous errors if validation passes

		// if (!checkFile(e)) return;
		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(selectedFile);
		setFile(selectedFile);
	};

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form
			className="grid grid-cols-2 gap-4 py-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="col-span-2">
				<p className="text-xs mb-1">Profile Picture</p>
				<label htmlFor="file" className="block">
					<img src={preview ?? avatar} className="h-20 w-20 rounded-lg" />
					<input
						className="hidden"
						id="file"
						type="file"
						onChange={handleFile}
					/>
				</label>
			</div>
			<div className="col-span-1">
				<BaseInput
					label="First Name"
					{...register(`firstName`, {
						required: "This field is required",
						minLength: {
							value: 2,
							message: "Atleast minimum of 2 characters is required",
						},
						setValueAs: (v) => v.trim(),
					})}
					error={errors.firstName}
					errorText={errors.firstName && errors.firstName.message}
				/>
			</div>
			<div className="col-span-1">
				<BaseInput
					label="Last Name"
					{...register(`lastName`, {
						required: "This field is required",
						minLength: {
							value: 2,
							message: "Atleast minimum of 2 characters is required",
						},
						setValueAs: (v) => v.trim(),
					})}
					error={errors.lastName}
					errorText={errors.lastName && errors.lastName.message}
				/>
			</div>
			<div className="col-span-1">
				<BaseSelect
					label="Country"
					{...register(`country`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.country}
					errorText={errors.country && errors.country.message}
				>
					<option></option>
				</BaseSelect>
			</div>
			<div className="col-span-1">
				<BaseSelect
					label="Gender"
					{...register(`gender`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.gender}
					errorText={errors.gender && errors.gender.message}
				>
					<option></option>
				</BaseSelect>
			</div>
			<div className="col-span-1">
				<BaseInput
					label="Phone Number"
					placeholder="+2348080183735"
					{...register(`phoneNumber`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.phoneNumber}
					errorText={errors.phoneNumber && errors.phoneNumber.message}
				/>
			</div>
			<div className="col-span-1">
				<BaseInput
					label="Email"
					{...register(`email`, {
						required: "This field is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: "invalid email address",
						},
						setValueAs: (v) => v.trim(),
					})}
					error={errors.email}
					errorText={errors.email && errors.email.message}
				/>
			</div>
			<div className="col-span-1">
				<BaseInput
					label="Password"
					{...register(`password`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.password}
					errorText={errors.password && errors.password.message}
				/>
			</div>
			<div className="col-span-1">
				<BaseInput
					label="Confirm Password"
					{...register(`confirmPassword`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.confirmPassword}
					errorText={errors.confirmPassword && errors.confirmPassword.message}
				/>
			</div>
			<div className="flex gap-4 items-start justify-end col-span-2 pt-4">
				<button
					className="p-3 px-8 rounded-md text-xs text-[#3514FF] bg-[#F0F5FF] font-bold cursor-pointer hover:opacity-80"
					onClick={goBack}
					type="button"
				>
					Back
				</button>
				<button
					className="p-3 px-8 rounded-md text-xs text-[#3514FF] bg-[#F0F5FF] font-bold cursor-pointer hover:opacity-80"
					type="submit"
				>
					Update
				</button>
			</div>
		</form>
	);
}

UserSummary.propTypes = {
	goBack: PropTypes.func,
};
