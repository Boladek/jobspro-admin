import { useState } from "react";
import { Modal } from "../../../../../component/modal";
import { BaseInput } from "../../../../../component/input";
import PropTypes from "prop-types";
import { BaseSelect } from "../../../../../component/select";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import avatar from "../../../../../assets/profile-avatar.png";
import { toast } from "react-toastify";
import { BaseTextArea } from "../../../../../component/text-area";
import { TiDelete } from "react-icons/ti";
import { useForm, useFieldArray } from "react-hook-form";

export function AddStaffModal({ open, handleClose }) {
	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState(null);
	const [skills, setSkills] = useState([]);
	const [text, setText] = useState("");

	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			experiences: [
				{
					jobTitle: "",
					companyName: "",
					startDate: "",
					endDate: "",
					description: "",
				},
			],
			education: [
				{
					degree: "",
					institution: "",
					startDate: "",
					endDate: "",
					description: "",
				},
			],
			skills: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "experiences",
	});

	const {
		fields: education,
		append: appendEducation,
		remove: removeEducation,
	} = useFieldArray({
		control,
		name: "education",
	});

	const handleKeyPress = (event) => {
		const { value } = event.target;
		if (event.key === "Enter") {
			// alert("Enter key pressed!");
			setSkills((prev) => [...prev, value]);
			setText("");
		}
	};

	const deleteSkill = (skill) => {
		setSkills((prev) => prev.filter((item) => item !== skill));
	};

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
		<Modal open={open} handleClose={handleClose} maxWidth={750}>
			<form className="w-full p-4 pb-20" onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-8">
					<p className={`font-bold text-primary`}>Onboard New Staff</p>
				</div>

				<div className="mb-4">
					<p className="text-adminPrimary font-bold">Bio</p>
					<div className="flex gap-3 mb-4 items-end">
						<div className="flex-1">
							<BaseInput
								label="FirstName"
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
						<div className="flex-1">
							<BaseInput
								label="LastName"
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
						<div className="flex-1">
							<p className="text-xs">Upload Profile Picture</p>
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
					</div>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
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
						<div className="flex-1">
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
						<div className="flex-1">
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
					</div>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
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
						<div className="flex-1">
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
						<div className="flex-1">
							<BaseInput
								label="Confirm Password"
								{...register(`confirmPassword`, {
									required: "This field is required",
									setValueAs: (v) => v.trim(),
								})}
								error={errors.confirmPassword}
								errorText={
									errors.confirmPassword && errors.confirmPassword.message
								}
							/>
						</div>
					</div>
				</div>

				<div className="mb-8">
					<p className="text-adminPrimary font-bold">Department Information</p>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseSelect
								label="Department"
								{...register(`department`, {
									setValueAs: (v) => v.trim(),
								})}
							>
								<option>Hourly</option>
								<option>Daily</option>
							</BaseSelect>
						</div>
						<div className="flex-1">
							<BaseSelect
								label="Role"
								{...register(`role`, {
									setValueAs: (v) => v.trim(),
								})}
							>
								<option>Hourly</option>
								<option>Daily</option>
							</BaseSelect>
						</div>
						<div className="flex-1 flex">
							<div className="flex-1">
								<BaseInput
									label="Salary"
									type="number"
									{...register(`rate`, {
										setValueAs: (v) => v.trim(),
									})}
								/>
							</div>
							{/* <div className="flex-2">
								<BaseSelect
									label="Period"
									{...register(`period`, {
										setValueAs: (v) => v.trim(),
									})}
								>
									<option>Hourly</option>
									<option>Daily</option>
								</BaseSelect>
							</div> */}
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="p-4 text-adminPrimary bg-[#E9E5FF] rounded-md text-xs font-bold w-36"
					>
						Add Staff
					</button>
				</div>
			</form>
		</Modal>
	);
}

AddStaffModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
