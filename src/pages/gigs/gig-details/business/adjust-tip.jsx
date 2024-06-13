import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseInput } from "../../../../component/input";

export function AdjustTip({ open, handleClose, openReview }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		handleClose();
		openReview();
	};

	const handleChange = (e) => {
		setReason(e.target.value);
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form
				className="py-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{loading && <Overlay message="Updating Industry" />}
				<div>
					<p className={`text-primary text-3xl font-bold mb-2`}>Adjust Tip</p>

					<div className="my-2">
						<BaseInput
							placeholder="1000"
							onChange={handleChange}
							type="number"
							label="Additional Tip"
						/>
						<p className="text-xs mt-1 text-gray-500">
							Based on your discretion and Pros performance beyond minimum
							expectations
						</p>
					</div>
				</div>
				<div className="mt-4">
					<BaseButton type="submit" loading={false}>
						Submit
					</BaseButton>
				</div>
			</form>
		</Modal>
	);
}

AdjustTip.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	openReview: PropTypes.func,
};
