import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";

export function DisputeGig({ open, handleClose }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		handleClose();
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
					<p className={`text-primary text-3xl font-bold`}>Dispute Gig</p>
					<p className="text-sm text-gray-500 mb-2">
						Please Input reason for dispute.
					</p>
					<div className="my-2">
						<BaseTextArea
							placeholder="Enter Dispute Reason"
							onChange={handleChange}
						/>
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

DisputeGig.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
