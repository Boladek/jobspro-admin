import { useState } from "react";
import { Modal } from "./modal";
import { BaseButton } from "./button";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import profileAxios from "../helpers/profileAxios";
import { Overlay } from "./overlay-component";
import { UseAuth } from "../context/auth-context";

export function UploadProfilePicModal({ open, handleClose, picture }) {
	const { refetch } = UseAuth();
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);

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

	console.log({ file, preview });

	const submit = async () => {
		// e.preventDefault();

		if (!file) {
			toast.error("No file selected.");
			return;
		}
		setLoading(true);

		const formData = new FormData();
		formData.append("file", file);

		profileAxios
			.post("profile/upload-image", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(() => {
				toast.success("Image uploaded successfully!");
				refetch();
				handleClose();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Uploading Image" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form className="w-full p-2" onSubmit={submit}>
					<div>
						<label
							className="block rounded-xl p-4 mb-1 border cursor-pointer"
							id="file-upload"
						>
							<div className="w-full text-center">
								<div className="flex justify-center">
									<img src={preview ?? picture} className="h-24" />
								</div>
								<p className="text-xs text-gray-500 underline mt-2">
									Click to upload
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
					</div>
					<div className="flex justify-center gap-2 mt-4">
						<div className="w-1/2">
							<BaseButton variant="sec" type="button" onClick={handleClose}>
								Cancel
							</BaseButton>
						</div>
						<div className="w-1/2">
							<BaseButton type="button" onClick={submit}>
								Upload
							</BaseButton>
						</div>
					</div>
				</form>
			</Modal>
		</>
	);
}

UploadProfilePicModal.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func,
	picture: PropTypes.string, // Proper usage of PropTypes
};
