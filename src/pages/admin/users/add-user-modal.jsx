import { useState } from "react";
import { Modal } from "../../../component/modal";
import { BaseInput } from "../../../component/input";
import PropTypes from "prop-types";
import { BaseSelect } from "../../../component/select";
import { FaPen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import avatar from "../../../assets/profile-avatar.png";
import { toast } from "react-toastify";
import { BaseTextArea } from "../../../component/text-area";
import { TiDelete } from "react-icons/ti";
import { useForm, useFieldArray, Controller } from "react-hook-form";

export function AddUserModal({ open, handleClose }) {
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
			skills: []
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
				<p className={`font-bold text-primary`}>Onboard New User</p>

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
				<div className="mb-4">
					<p className="text-adminPrimary font-bold">Profession</p>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseInput
								label="Title"
								{...register(`profession`, {
									setValueAs: (v) => v.trim(),
								})}
							/>
						</div>
						<div className="flex-1">
							<BaseInput
								label="Years of Experience"
								{...register(`yearsOfExpression`, {
									setValueAs: (v) => v.trim(),
								})}
								type="number"
							/>
						</div>
						<div className="flex-1 flex">
							<div className="flex-1">
								<BaseInput
									label="Rate"
									type="number"
									{...register(`rate`, {
										setValueAs: (v) => v.trim(),
									})}
								/>
							</div>
							<div className="flex-2">
								<BaseSelect
									label="Period"
									{...register(`period`, {
										setValueAs: (v) => v.trim(),
									})}
								>
									<option>Hourly</option>
									<option>Daily</option>
								</BaseSelect>
							</div>
						</div>
					</div>
					<p>Skills</p>
					<div className="flex gap-3 mb-4 items-center flex-wrap">
						{skills &&
							skills.map((item) => (
								<div
									key={item}
									className="border py-1 px-4 rounded-full flex gap-2 items-center text-[#025949] bg-[#0FFF9A] text-xs border-adminPrimary"
								>
									<span>{item}</span>
									<span
										onClick={() => deleteSkill(item)}
										className="p-1 cursor-pointer"
									>
										&#x2716;
									</span>
								</div>
							))}
						<div className="w-48">
							<label className="relative">
								<input
									placeholder="Enter Skill"
									onKeyPress={handleKeyPress}
									className="user-skill rounded-full p-3 px-4 text-xs border bg-[#667085] text-white outline-dark"
									value={text}
									onChange={(e) => setText(e.target.value)}
								/>
								<span className="absolute right-2 -top-0 p-1.5 rounded-full bg-white">
									<FaPen className="text-[#667085] text-xs" />
								</span>
							</label>
						</div>
					</div>
				</div>
				<div className="mb-4">
					<p className="text-adminPrimary font-bold">Experience</p>

					{fields.map((item, index) => (
						<div key={item.id}>
							<div className="flex gap-3 mb-4">
								<div className="flex-1">
									<BaseInput
										label="Job Title"
										{...register(`experiences[${index}].jobTitle`, {
											setValueAs: (v) => v.trim(),
										})}
									/>
								</div>
								<div className="flex-1">
									<BaseInput
										label="Company Name"
										{...register(`experiences[${index}].companyName`, {
											setValueAs: (v) => v.trim(),
										})}
									/>
								</div>
							</div>
							<div className="flex gap-3 mb-4">
								<div className="flex-1">
									<BaseInput
										label="Start Date"
										type="date"
										{...register(`experiences[${index}].startDate`, {})}
									/>
								</div>
								<div className="flex-1">
									<BaseInput
										label="End Date"
										type="date"
										{...register(`experiences[${index}].endDate`, {})}
									/>
								</div>
							</div>
							<div className="mb-2">
								<BaseTextArea
									placeholder="Brief description of work done"
									{...register(`experiences[${index}].description`, {
										setValueAs: (v) => v.trim(),
									})}
								/>
							</div>
							{fields.length > 1 && (
								<div className="flex justify-end">
									<span
										className="text-sm flex gap-0.5 items-center"
										onClick={() => remove(index)}
									>
										Remove Experience
										<TiDelete className="text-red-500 text-2xl" />
									</span>
								</div>
							)}
						</div>
					))}
					<div>
						<div
							className="rounded-full p-2 pl-4 bg-[#667085] flex gap-2 w-fit text-white items-center text-xs cursor-pointer"
							onClick={() =>
								append({
									jobTitle: "",
									companyName: "",
									startDate: "",
									endDate: "",
									description: "",
								})
							}
						>
							<span>Add Experience</span>
							<span className="rounded-full bg-white p-1.5">
								<FaPlus className="text-[#667085]" />
							</span>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<p className="text-adminPrimary font-bold">Education</p>

					{education.map((item, index) => (
						<div key={item.id}>
							<div className="flex gap-3 mb-4">
								<div className="flex-1">
									<BaseInput
										label="Degree"
										{...register(`education[${index}].degree`, {
											setValueAs: (v) => v.trim(),
										})}
									/>
								</div>
								<div className="flex-1">
									<BaseInput
										label="Institution"
										{...register(`education[${index}].institution`, {
											setValueAs: (v) => v.trim(),
										})}
									/>
								</div>
							</div>
							<div className="flex gap-3 mb-4">
								<div className="flex-1">
									<BaseInput
										label="Start Date"
										type="date"
										{...register(`education[${index}].startDate`, {})}
									/>
								</div>
								<div className="flex-1">
									<BaseInput
										label="End Date"
										type="date"
										{...register(`education[${index}].endDate`, {})}
									/>
								</div>
							</div>
							<div className="mb-2">
								<BaseTextArea
									placeholder="Brief description of work done"
									{...register(`education[${index}].description`, {
										setValueAs: (v) => v.trim(),
									})}
								/>
							</div>
							{fields.length > 1 && (
								<div className="flex justify-end">
									<span
										className="text-sm flex gap-0.5 items-center"
										onClick={() => removeEducation(index)}
									>
										Remove Experience
										<TiDelete className="text-red-500 text-2xl" />
									</span>
								</div>
							)}
						</div>
					))}
					<div>
						<div
							className="rounded-full p-2 pl-4 bg-[#667085] flex gap-2 w-fit text-white items-center text-xs cursor-pointer"
							onClick={() =>
								appendEducation({
									degree: "",
									institution: "",
									startDate: "",
									endDate: "",
									description: "",
								})
							}
						>
							<span>Add Education</span>
							<span className="rounded-full bg-white p-1.5">
								<FaPlus className="text-[#667085]" />
							</span>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="submit"
						className="p-4 text-adminPrimary bg-[#E9E5FF] rounded-md text-xs font-bold w-36"
					>
						Add User
					</button>
				</div>
			</form>
		</Modal>
	);
}

AddUserModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
