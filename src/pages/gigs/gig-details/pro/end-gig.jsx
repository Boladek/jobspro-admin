import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";
import profileAxios from "../../../../helpers/profileAxios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export function EndGig({ open, handleClose, openReview }) {
	const location = useLocation();
	const { gigData } = location.state;
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		setLoading(true);
		profileAxios
			.post(`/pro-gigs/mark-completed/${gigData.gig.uuid}`)
			.then((res) => {
				toast.success(res.message);
				handleClose();
				openReview();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			{loading && <Overlay message="Ending Gig" />}
			<form
				className="py-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{/* {loading && <Overlay message="Updating Industry" />} */}

				<div className="mb-8">
					<p className={`text-primary text-3xl font-bold mb-4`}>End Gig</p>
					<p className="text-sm text-gray-500">
						Are you sure you want to end the ongoing gig?
					</p>
				</div>
				{/* <div className="mb-4">
					<BaseTextArea placeholder="Reason" />
				</div> */}
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
