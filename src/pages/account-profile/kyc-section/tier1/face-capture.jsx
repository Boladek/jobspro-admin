import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { Modal } from "../../../../component/modal";
import PropTypes from "prop-types";
import { BaseButton } from "../../../../component/button";
import kycAxios from "../../../../helpers/kycAxios";
import { Overlay } from "../../../../component/overlay-component";
import { toast } from "react-toastify";
import { SquareButton } from "../../../../component/square-button";

export function FaceCapture({ open, handleClose, action, bvn }) {
	const webcamRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [imgSrc, setImgSrc] = useState(null);

	function removeBase64Prefix(base64Image) {
		const prefix = "data:image/jpeg;base64,";
		return base64Image.replace(prefix, "");
	}

	const submit = () => {
		setLoading(true);
		kycAxios
			.post("/kyc/verify-selfie-bvn", {
				bvn: bvn,
				selfieImage: removeBase64Prefix(imgSrc),
			})
			.then((res) => {
				action();
				toast.success(res.message);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef]);

	const retake = () => setImgSrc(null);

	return (
		<>
			{loading && <Overlay message="Verifying Selfie" />}
			<Modal open={open} handleClose={handleClose}>
				<div className="container">
					<div className="p-2 border rounded-lg">
						{imgSrc ? (
							<img src={imgSrc} alt="webcam" />
						) : (
							<Webcam
								height={400}
								width={400}
								ref={webcamRef}
								screenshotFormat="image/jpeg"
								mirrored
							/>
						)}
					</div>
					<div className="btn-container py-2">
						{imgSrc ? (
							<div className="flex gap-2">
								<div className="flex-1">
									<SquareButton onClick={retake} variant="sec">
										Retake photo
									</SquareButton>
								</div>
								<div className="flex-1">
									<SquareButton onClick={submit}>Verify</SquareButton>
								</div>
							</div>
						) : (
							<SquareButton onClick={capture}>Capture photo</SquareButton>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
}

FaceCapture.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	bvn: PropTypes.string,
	action: PropTypes.func,
};
