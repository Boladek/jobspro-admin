import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import info from "../../../assets/info.png";

export function Step2() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const fileInputRef = useRef(null);
	const [selected, setSelected] = useState(null);
	const [file, setFile] = useState(null);

	const onSubmit = (data) => {
		console.log({ data });
	};

	const handleDivClick = () => {
		// Trigger the click event on the hidden file input
		fileInputRef.current.click();
	};

	const handleProfile = (e) => {
		// if (!checkFile(e)) return;
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	return (
		<div style={{ width: "100%" }} className="p-4">
			<div className="flex gap-1 items-center border rounded-md p-2 mb-4">
				<img src={info} alt="Information" />
				<div className="w-4/5 text-xs text-gray-500">
					Based on your industry of specialization you have to provide the
					following information
				</div>
			</div>
			<p className={`text-[${colors.primary}] text-3xl font-bold`}>
				Do you have a resume?
			</p>
			<p className="text-sm text-gray-500 mb-4">
				We need to get a sense of your education, experience and skills. It’s
				quickest to import your information
			</p>
			<div className="flex w-full gap-2 mb-4">
				{["yes", "no"].map((item) => (
					<div
						onClick={() => setSelected(item)}
						className={`w-1/4 p-2 border-2 border-[${colors.primary}] text-${
							selected === item ? "white" : `[${colors.primary}]`
						} rounded-full items-center text-center font-bold capitalize bg-[${
							selected === item ? colors.primary : "#FFF"
						}] cursor-pointer`}
					>
						{item}
					</div>
				))}
			</div>
			<div
				style={{ maxWidth: 500, width: "100%" }}
				className="border rounded-md p-6 mb-2 text-center"
				onClick={handleDivClick}
			>
				<span className="text-6xl material-symbols-outlined">upload_file</span>
				<p className="text-xs text-gray-500 underline">Upload your file</p>
				<input
					id="photo-upload"
					type="file"
					className="opacity-0 relative z-1"
					onChange={handleProfile}
					accept="image/*"
				/>
			</div>
			<p className="text-xs text-gray-500 mb-4">
				Use a PDF, Word doc, or rich text file - make sure it’s 5mb or less
			</p>
			{file && (
				<div className="border rounded-md p-3 mb-2 flex gap-2">
					<span className="material-symbols-outlined">description</span>
					<div className="flex-1">
						<p className="text-base font-bold">{file.name}</p>{" "}
						<p className="text-xs text-gray-500">
							{parseFloat(file.size / (1024 * 1024)).toFixed(4)} MB
						</p>
					</div>
					<span
						className="material-symbols-outlined text-rose-700"
						onClick={() => setFile(null)}
					>
						delete
					</span>
				</div>
			)}
			<div
				className="flex justify-end gap-2 mt-4"
				style={{ maxWidth: 500, width: "100%" }}
			>
				<div className="w-1/4">
					<BaseButton type="submit">Previous</BaseButton>
				</div>
				<div className="w-1/4">
					<BaseButton type="submit">Next</BaseButton>
				</div>
			</div>
		</div>
	);
}
