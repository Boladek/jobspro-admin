import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";
import { StarRating } from "../../../../component/star-rating";
import { formatNumber } from "../../../../helpers/function";
import profileAxios from "../../../../helpers/profileAxios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export function GigReview({ open, handleClose }) {
	const location = useLocation();
	const { gigData } = location.state;
	const { handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState("");

	const [rating, setRating] = useState(0);

	const onSubmit = () => {
		setLoading(true);
		profileAxios
			.post("/pro-gigs/rate-business", {
				gigId: gigData.gig.gigAccepted[0].uuid,
				rating,
				comments: comment,
			})
			.then((res) => {
				toast.success(res.message);
				setTimeout(() => {
					handleClose();
				}, 2000);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			{loading && <Overlay message="Rating Gig" />}
			<form
				className="py-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{loading && <Overlay message="Updating Industry" />}

				<div>
					<p className={`text-primary text-3xl font-bold`}>Leave a Review</p>
					<p className="text-sm text-gray-500 mb-4">
						How was your experience with your employer?
					</p>
				</div>
				<div className="flex py-2 justify-between items-center mb-4">
					<StarRating
						size={0.75}
						rating={rating}
						handleRating={(arg) => setRating(arg)}
					/>
					{rating > 0 && (
						<p className="font-bold text-primary">{formatNumber(rating, 2)}</p>
					)}
				</div>
				<div className="mb-4">
					<BaseTextArea
						placeholder="Additional Comments"
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
				</div>
				<div className="flex gap-1">
					<BaseButton type="submit" loading={false}>
						Submit
					</BaseButton>
				</div>
			</form>
		</Modal>
	);
}

GigReview.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
