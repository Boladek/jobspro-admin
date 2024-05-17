import { useState } from "react";
import editIcon from "../../../assets/edit.png";
import location from "../../../assets/location.png";
import avatar from "../../../assets/profile-avatar.png";

export function UserPictureSection() {
	// eslint-disable-next-line no-unused-vars
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);

	const handleFile = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result);
		};
		reader.readAsDataURL(e.target.files[0]);
		setFile(e.target.files[0]);
	};

	return (
		<div className="flex flex-col gap-2 items-center mb-4">
			<label className="relative block" id="pic-upload">
				<img
					src={preview ?? avatar}
					className="h-28 w-28 shadow-md border rounded-full"
				/>
				<span
					className="absolute p-2 bg-blue-100 rounded-full"
					style={{
						bottom: -10.5,
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<img src={editIcon} />
				</span>
				<input
					id="pic-upload"
					type="file"
					className="hidden absolute z-1"
					onChange={handleFile}
					// onClick={handleDivClick}
					accept="image/*"
				/>
			</label>
			<div className="text-center">
				<p className="font-bold">Nneka Editi</p>
				<div className="text-xs text-gray-500 flex gap-1 items-center">
					<img src={location} className="h-4" /> Ikeja, Lagos
				</div>
			</div>
			<div
				className={`py-2 px-2 flex items-center gap-2 border border-primary text-xs rounded-full items-center font-bold bg-blue-50`}
			>
				Gardener
				<img src={editIcon} alt="edit" />
			</div>
		</div>
	);
}
