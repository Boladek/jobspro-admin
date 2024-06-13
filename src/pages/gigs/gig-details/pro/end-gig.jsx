import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";

export function EndGig({ open, handleClose, openReview }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		handleClose();
		openReview();
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
					<p className={`text-primary text-3xl font-bold`}>End Gig</p>
					<p className="text-sm text-gray-500 mb-4">
						Are you sure you want to end the ongoing gig?
					</p>
				</div>
				<div className="mb-4">
					<BaseTextArea placeholder="Reason" />
				</div>
				<div className="flex gap-1">
					<div className="flex-1">
						<BaseButton variant="danger" onClick={handleClose}>
							No
						</BaseButton>
					</div>
					<div className="flex-1">
						<BaseButton type="submit" loading={false}>
							Yes
						</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

EndGig.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	openReview: PropTypes.func,
};
