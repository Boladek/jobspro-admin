import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { SquareButton } from "../../../../component/square-button";
import { Modal } from "../../../../component/modal";
import { MdOutlineAttachFile, MdCancel } from "react-icons/md";
import { FaFileCircleCheck } from "react-icons/fa6";
import { ProgressBar } from "../../../../component/admin/progress-bar";

export function UploadFile({ open, handleClose, picture, handlePicture }) {
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const [loading, setLoading] = useState(false);

	// console.log({ file });

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

	// console.log({ file, preview });

	const submit = async () => {
		// e.preventDefault();

		if (!file) {
			toast.error("No file selected.");
			return;
		}
		setLoading(true);

		const formData = new FormData();
		formData.append("file", file);

		// profileAxios
		// 	.post("profile/upload-image", formData, {
		// 		headers: {
		// 			"Content-Type": "multipart/form-data",
		// 		},
		// 	})
		// 	.then(() => {
		// 		toast.success("Image uploaded successfully!");
		// 		refetch();
		// 		handleClose();
		// 	})
		// 	.catch((err) => toast.error(err.response.data.message))
		// .finally(() => setLoading(false));
	};

	return (
		<>
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form className="w-full p-2" onSubmit={submit}>
					<div>
						{preview ? (
							<>
								<div
									className="block rounded-xl p-4 mb-1 border cursor-pointer mx-auto w-fit relative bg-gray-200"
									id="file-upload"
								>
									<p className="text-xs text-gray-500 text-center mb-2">
										{parseFloat(file.size / 1024).toFixed(2)} KB
									</p>
									<div className="flex justify-center mb-2">
										<FaFileCircleCheck className="text-4xl" />
									</div>
									<p className="text-xs text-gray-500 text-center font-bold">
										{file.name}
									</p>
									<span
										className="absolute -top-2 -right-1"
										onClick={() => setPreview(null)}
									>
										<MdCancel />
									</span>
								</div>
								<div className="mx-auto w-24">
									<ProgressBar color="#C2FF16" thickness={1.5} />
								</div>
							</>
						) : (
							<label
								className="block rounded-xl p-4 mb-1 border cursor-pointer bg-gray-200 mx-auto w-36"
								id="file-upload"
							>
								<div className="w-full text-center">
									<div className="flex justify-center border p-4 w-fit bg-white rounded-full mx-auto">
										<MdOutlineAttachFile className="text-3xl" />
									</div>
									<p className="text-xs text-gray-500 underline mt-2">
										Click to upload (max 1mb)
									</p>
								</div>
								<input
									id="photo-upload"
									type="file"
									className="hidden relative z-1"
									onChange={handleFile}
									// accept="image/*"
								/>
							</label>
						)}
					</div>
					<div className="mt-4">
						<SquareButton type="button" onClick={submit}>
							Upload File
						</SquareButton>
					</div>
				</form>
			</Modal>
		</>
	);
}

UploadFile.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func,
	picture: PropTypes.string, // Proper usage of PropTypes
	handlePicture: PropTypes.func,
};
