import React from "react";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import { Modal } from "../../../../component/modal";
import PropTypes from "prop-types";
import { BaseButton } from "../../../../component/button";

export function FaceCapture({ open, handleClose, action }) {
	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);

	// console.log({ imgSrc });

	const submit = () => {
		action();
	};

	// create a capture function
	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef]);

	const retake = () => setImgSrc(null);

	return (
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
								<BaseButton onClick={retake} variant="sec">
									Retake photo
								</BaseButton>
							</div>
							<div className="flex-1">
								<BaseButton onClick={submit}>Continue</BaseButton>
							</div>
						</div>
					) : (
						<BaseButton onClick={capture}>Capture photo</BaseButton>
					)}
				</div>
			</div>
		</Modal>
	);
}

FaceCapture.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
};
