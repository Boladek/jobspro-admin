import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import avatar from "../../../assets/profile-avatar.png";
import bump from "../../../assets/bump.png";
import info from "../../../assets/info.png";
import illustration from "../../../assets/illustration.png";
import { BaseSelect } from "../../../component/select";
import { Modal } from "../../../component/modal";

const texts = ["hello", "world", "city", "country", "state"];

export function Step1({ gotoNext }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [allTexts, setAllTexts] = useState(texts);
	const [selectedText, setSelectedText] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);

	const onSubmit = (data) => {
		console.log({ data });
	};

	const handleChange = (e) => {
		const { value } = e.target;
		setAllTexts((prev) => prev.filter((item) => item !== value));
		setSelectedText((prev) => [...prev, value]);
	};

	const handleCancel = (text) => {
		setAllTexts((prev) => [...prev, text]);
		setSelectedText((prev) => prev.filter((item) => item !== text));
	};

	return (
		<div style={{ width: "100%" }} className="p-4">
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				What your Industry of specialisation?
			</p>
			<p className="text-sm text-gray-500 mb-4">
				More information should be placed here
			</p>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6 mb-4"
			>
				<div className="mb-2">
					<BaseSelect
						label="Industry"
						{...register("industry", {
							required: "This field is required",
						})}
						onChange={handleChange}
						error={errors.industry}
						errorText={errors.industry && errors.industry.message}
					>
						{allTexts.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</BaseSelect>
				</div>
				<div className="flex gap-2">
					{selectedText.map((text) => (
						<div
							className={`flex gap-2 py-1 px-2 border-2 border-[${colors.primary}] text-[${colors.primary}] text-xs rounded-full items-center font-bold`}
						>
							<span>{text}</span>
							<span
								onClick={() => handleCancel(text)}
								className="material-symbols-outlined cursor-pointer"
							>
								cancel
							</span>
						</div>
					))}
				</div>
			</div>

			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				Sub category
			</p>
			<p className="text-sm text-gray-500 mb-4">
				Pick one service that best represents your work, so our algorithm can
				match you with the right clients.
			</p>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6 mb-4"
			>
				<div className="mb-2">
					<BaseSelect
						label="Services"
						{...register("industry", {
							required: "This field is required",
						})}
						onChange={handleChange}
						error={errors.industry}
						errorText={errors.industry && errors.industry.message}
					>
						{allTexts.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</BaseSelect>
				</div>
				<div className="flex gap-2">
					{selectedText.map((text) => (
						<div
							className={`flex gap-2 py-1 px-2 border-2 border-[${colors.primary}] text-[${colors.primary}] text-xs rounded-full items-center font-bold`}
						>
							<span>{text}</span>
							<span
								onClick={() => handleCancel(text)}
								className="material-symbols-outlined cursor-pointer"
							>
								cancel
							</span>
						</div>
					))}
				</div>
			</div>
			<div
				className="flex justify-end gap-2"
				style={{ maxWidth: 500, width: "100%" }}
			>
				<div className="w-1/4">
					<BaseButton type="button">Previous</BaseButton>
				</div>
				<div className="w-1/4">
					<BaseButton type="button" onClick={gotoNext}>
						Next
					</BaseButton>
				</div>
			</div>

			{/* {open && (
				<Modal open={open} handleClose={() => setOpen(false)}>
					<div className="w-full p-2">
						<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
							<div>
								<img src={illustration} alt="Illustration" />
							</div>
							<p className={`font-bold text-black`}>Hey Nneka</p>
							<p className="text-xs text-gray-500 text-center">
								Please click Get started to complete the setup your profile
							</p>
						</div>
						<div className="flex gap-1 items-center border rounded-md p-2 mb-4">
							<img src={info} alt="Information" />
							<div className="w-4/5 text-xs text-gray-500">
								You only need 1-2 minutes, and you can make edits later. We'll
								save your progress as you go.
							</div>
						</div>
						<div className="flex gap-2">
							<div className="mb-4 w-1/2">
								<BaseButton>Skip</BaseButton>
							</div>
							<div className="mb-4 w-1/2">
								<BaseButton>Get Started</BaseButton>
							</div>
						</div>
					</div>
				</Modal>
			)}
			{openSuccess && (
				<Modal open={openSuccess} handleClose={() => setOpenSuccess(false)}>
					<div className="w-full p-2">
						<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
							<div>
								<img src={bump} alt="Illustration" />
							</div>
							<p className={`font-bold text-black`}>Hey Nneka</p>
							<p className="text-xs text-gray-500 text-center">
								Go ahead and create a job post
							</p>
						</div>

						<div className="">
							<BaseButton>Done</BaseButton>
						</div>
					</div>
				</Modal>
			)} */}
		</div>
	);
}
