import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";
import profileAxios from "../../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { NotificationsHook } from "../../../../hooks/notifications-hook";

export function DisputeGig({ open, handleClose, refetch, gigData }) {
	const { refetchNotifications } = NotificationsHook();
	const { handleSubmit } = useForm();
	const [reason, setReason] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		// e.preventDefault();
		setLoading(true);
		profileAxios
			.post(`/gigs/dispute-gig`, {
				gigAcceptedId: gigData.gigAccepted[0].uuid,
				reason: reason,
			})
			.then((res) => {
				toast.success(res.message);
				refetchNotifications();
				refetch();
				handleClose();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form
				className="p-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{loading && <Overlay message="Disputing Gig" />}
				<div>
					<p className={`text-primary text-3xl font-bold mb-4`}>Dispute Gig</p>
					<p className="text-sm text-gray-500 mb-6">
						Are you sure you want to raise a dispute?
					</p>
					<div className="my-2">
						<BaseTextArea
							onChange={(e) => setReason(e.target.value)}
							required
							label="Comments"
						/>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<div className="flex-1">
						<BaseButton type="submit" loading={false}>
							Yes
						</BaseButton>
					</div>
					<div className="flex-1">
						<BaseButton
							type="button"
							variant="danger"
							onClick={handleClose}
							loading={false}
						>
							No
						</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

DisputeGig.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	refetch: PropTypes.func,
	gigData: PropTypes.object,
};
