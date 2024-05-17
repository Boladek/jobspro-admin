import { useState } from "react";
import { Modal } from "./modal";
import { BaseButton } from "./button";
import work from "../assets/work-experience.png";
import { colors } from "../helpers/theme";
import { BaseInput } from "./input";
import { BaseTextArea } from "./text-area";
import PropTypes from "prop-types";
import upload from "../assets/upload-icon.png";
import close from "../assets/close-circle.png";

export function WorkExperienceModal({ open, handleClose, form = {} }) {
	const [remember, setRemember] = useState(false);
	const [files, setFiles] = useState([]);
	const [previews, setPreviews] = useState([]);

	const handleFile = (e) => {
		// if (!checkFile(e)) return;
		const reader = new FileReader();
		reader.onload = () => {
			setPreviews((prev) => [...prev, reader.result]);
		};
		reader.readAsDataURL(e.target.files[0]);
		setFiles((prev) => [...prev, e.target.files[0]]);
	};

	const filterPreviews = (preview, index) => {
		setPreviews((prev) => prev.filter((item) => item !== preview));
		setFiles((prev) => prev.filter((item, pos) => index !== pos));
	};

	console.log({ files, previews });

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={750}>
			<form className="w-full p-2">
				<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
					<div className="hidden md:block">
						<img src={work} alt="Illustration" height="50" className="h-24" />
					</div>
					<p className={`font-bold text-primary text-2xl`}>
						Add work Experience
					</p>
				</div>
				<div className="block gap-4 mb-4 md:flex">
					<div className="w-full md:w-1/2">
						<div className="mb-2">
							<BaseInput label="Title" defaultValue={form.title} />
						</div>
						<div className="mb-2">
							<BaseInput
								label="Place of work"
								defaultValue={form.placeOfWork}
							/>
						</div>
						<div className="mb-2">
							<BaseInput label="City" defaultValue={form.city} />
						</div>
						<div className="mb-2">
							<BaseInput label="Country" defaultValue={form.country} />
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<div className="flex gap-2 mb-2">
							<input
								value={remember}
								onChange={(e) => setRemember(e.target.checked)}
								type="checkbox"
								className="form-checkbox h-4 w-4 text-indigo-600 border-indigo-600 rounded"
							/>
							<label className="text-xs">
								I’m currently working in this position
							</label>
						</div>
						<div className="flex gap-2">
							<div className="mb-2">
								<BaseInput
									label="Start Date"
									defaultValue={form.startDate}
									type="date"
								/>
							</div>
							<div className="mb-2">
								<BaseInput label="End Date" disabled={remember} type="date" />
							</div>
						</div>
						<div className="mb-2">
							<BaseTextArea label="Description" />
						</div>
						<div className="flex gap-2 flex-wrap">
							<label
								className="block border rounded-xl p-2 mb-1 w-1/4"
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
									onChange={handleFile}
									accept="image/*"
								/>
							</label>
							{/* <label
								id="files-upload"
								className="block border rounded-md p-2 text-center w-1/4"
							>
								<img src={upload} className="h-8" />
								<p className="text-xs text-gray-500 underline">Upload Work</p>
								<input
									id="files-upload"
									type="file"
									className="opacity-0 absolute z-1"
									onChange={handleFile}
									// onClick={handleDivClick}
									accept="image/*"
								/>
							</label> */}
							{previews.map((item, index) => (
								<div
									className="relative h-20 w-1/4 overflow-hidden border rounded-xl bg-gray-900"
									key={item}
									style={{
										backgroundImage: `url(${item})`,
										backgroundSize: "cover", // Optional: adjust according to your needs
										backgroundPosition: "center", // Optional: adjust according to your needs
									}}
								>
									{/* <span
										className="material-symbols-outlined text-white absolute transform -translate-x-1/2 -translate-y-1/2 z-10 top-1/2 left-1/2 cursor-pointer"
										// onClick={() => setFile(null)}
										onClick={() => filterPreviews(item, index)}
									>
										cancel
									</span> */}

									<div className="absolute inset-0 flex justify-center items-center">
										<img
											src={close}
											className="h-8"
											onClick={() => filterPreviews(item, index)}
										/>
									</div>
									{/* <img src={item} className="h-full w-full object-cover" /> */}
								</div>
							))}
						</div>
					</div>
				</div>
				<hr />
				<div className="flex justify-center gap-2 mt-4">
					<div className="w-1/4">
						<BaseButton variant="sec">Cancel</BaseButton>
					</div>
					<div className="w-1/4">
						<BaseButton>Save</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

WorkExperienceModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
