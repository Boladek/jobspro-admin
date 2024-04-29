/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { BaseSelect } from "../../../component/select";

const texts = ["hello", "world", "city", "country", "state"];

export function Industry() {
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
		<div
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
		>
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div>
					<p className={`text-primary text-3xl font-bold`}>
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
									key={text}
									className={`flex gap-2 py-1 px-2 border-2 border-primary text-primary text-xs rounded-full items-center font-bold`}
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
					<p className={`text-primary text-3xl font-bold`}>Sub category</p>
					<p className="text-sm text-gray-500 mb-4">
						Pick one service that best represents your work, so our algorithm
						can match you with the right clients.
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
									key={text}
									className={`flex gap-2 py-1 px-2 border-2 border-primary text-primary text-xs rounded-full items-center font-bold`}
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
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec" loading={false}>
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" loading={false}>
						Next
					</BaseButton>
				</div>
			</div>
		</div>
	);
}
