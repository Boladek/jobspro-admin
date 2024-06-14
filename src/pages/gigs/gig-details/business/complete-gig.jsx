import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";

export function CompleteGig({ open, handleClose, openDispute, openTip, openReview }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [reason, setReason] = useState("");
	const [otherReason, setOtherReason] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		handleClose();
		openReview()
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
					<p className={`text-primary text-3xl font-bold`}>Gig completed</p>
					<p className="text-sm text-gray-500 mb-2">
						Proceed with one of the below actions to complete the process
					</p>
				</div>
				<div className="p-3">
					<p className="text-sm">Thrilled with the service rendered?</p>
					<div
						onClick={openTip}
						className="py-2 text-accent font-bold text-sm w-fit cursor-pointer hover:opacity-80 hover:underline"
					>
						Adjust Tip &rarr;
					</div>
				</div>
				<div className="mt-4 flex gap-2">
					<div className="flex-1">
						<BaseButton type="submit" loading={false}>
							Confirm
						</BaseButton>
					</div>
					<div className="flex-1">
						<BaseButton
							type="button"
							onClick={openDispute}
							variant="danger"
							loading={false}
						>
							Dispute
						</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

CompleteGig.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	openDispute: PropTypes.func,
	openTip: PropTypes.func,
	openReview: PropTypes.func,
};
