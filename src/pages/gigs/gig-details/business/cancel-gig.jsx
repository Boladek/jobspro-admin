import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";
import profileAxios from "../../../../helpers/profileAxios";
import { toast } from "react-toastify";

export function CancelGig({ open, handleClose, id, type = "pro" }) {
	const { handleSubmit } = useForm();
	// const [reason, setReason] = useState("");
	const [otherReason, setOtherReason] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		setLoading(true);
		if (type === "pro") {
			profileAxios
				.post("/gigs/cancel-gig", {
					gigAcceptedId: id,
					reason: otherReason,
				})
				.then((res) => {
					toast.success(res.message);
					handleClose();
				})
				.catch((err) => toast.error(err.response.data.message))
				.finally(() => setLoading(false));
		} else {
			profileAxios
				.post("/gigs/cancel-gig", {
					gigAcceptedId: id,
					reason: otherReason,
				})
				.then((res) => {
					toast.success(res.message);
					handleClose();
				})
				.catch((err) => toast.error(err.response.data.message))
				.finally(() => setLoading(false));
		}
	};

	// const handleChange = (e) => {
	// 	setReason(e.target.value);
	// };

	return (
		<>
			{loading && <Overlay message="Cancelling gig" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form
					className="py-4 h-full flex flex-col"
					style={{ maxWidth: 500, width: "100%" }}
					onSubmit={handleSubmit(onSubmit)}
				>
					{loading && <Overlay message="Updating Industry" />}

					<div>
						<p className={`text-primary text-3xl font-bold`}>Cancel Gig</p>
						<p className="text-sm text-gray-500 mb-2">
							Please Input reason for gig cancellation.
						</p>

						<div className="my-2">
							<BaseTextArea
								placeholder="Enter Cancellation Reason"
								onChange={(e) => setOtherReason(e.target.value)}
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
		</>
	);
}

CancelGig.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	id: PropTypes.string,
	type: PropTypes.string,
};
