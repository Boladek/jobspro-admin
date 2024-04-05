import { useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import info from "../../../assets/info.png";
import upload from "../../../assets/upload-icon.png";

export function Resume() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [selected, setSelected] = useState(null);
	const [file, setFile] = useState(null);

	const onSubmit = (data) => {
		console.log({ data });
	};

	const handleProfile = (e) => {
		// if (!checkFile(e)) return;
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	return (
		<div
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
		>
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div style={{ maxWidth: 500, width: "100%" }}>
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
						We need to get a sense of your education, experience and skills.
						It’s quickest to import your information
					</p>
					<div className="flex w-full gap-2 mb-4">
						{["yes", "no"].map((item) => (
							<div
								key={item}
								onClick={() => setSelected(item)}
								className={`w-1/2 md:w-1/4 p-2 border-2 border-[${
									colors.primary
								}] text-${
									selected === item ? "white" : `[${colors.primary}]`
								} rounded-full items-center text-center font-bold capitalize bg-[${
									selected === item ? colors.primary : "#FFF"
								}] cursor-pointer`}
							>
								{item}
							</div>
						))}
					</div>
					<label
						className="block border rounded-xl p-6 mb-1 w-full"
						id="file-upload"
					>
						<div className="w-full text-center">
							<div className="flex justify-center">
								<img src={upload} className="h-8" />
							</div>
							<p className="text-xs text-gray-500 underline">
								Upload your file
							</p>
						</div>
						<input
							id="photo-upload"
							type="file"
							className="hidden relative z-1"
							onChange={handleProfile}
							accept="image/*"
						/>
					</label>
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
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec">
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button">Next</BaseButton>
				</div>
			</div>
		</div>
	);
}
