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
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export function GigReview({ open, handleClose }) {
	const location = useLocation();
	const { gigData } = location.state;
	const { handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [rating, setRating] = useState(0);
	const [hygienerating, setHygieneRating] = useState(0);
	const [punctualRating, setPunctualRating] = useState(0);
	const [comments, setComments] = useState("");

	const onSubmit = () => {
		setLoading(true);
		profileAxios
			.post("/gigs/rate-pro", {
				gigAcceptedId: gigData.gigAccepted[0].uuid,
				professionalRating: rating,
				punctualRating: punctualRating,
				hygieneRating: hygienerating,
				comments: comments,
			})
			.then((res) => {
				toast.success(res.message);
				setTimeout(() => {
					handleClose();
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Rating Pro" />}
			<Modal open={open} handleClose={handleClose} maxWidth={400}>
				<form
					className="py-4 h-full flex flex-col"
					style={{ maxWidth: 500, width: "100%" }}
					onSubmit={handleSubmit(onSubmit)}
				>
					{loading && <Overlay message="Reviewing Pro" />}

					<div>
						<p className={`text-primary text-3xl font-bold`}>Leave a Review</p>
						<p className="text-sm text-gray-500 mb-4">
							How was your experience with the pro?
						</p>
					</div>
					<div className="mb-4">
						<p className="text-sm font-bold">Rate Pros Punctuality</p>
						<div className="flex py-2 justify-between items-center">
							<StarRating
								size={0.75}
								rating={punctualRating}
								handleRating={(val) => setPunctualRating(val)}
							/>
							{punctualRating > 0 && (
								<p className="font-bold text-primary">
									{formatNumber(punctualRating, 2)}
								</p>
							)}
						</div>
					</div>
					<div className="mb-4">
						<p className="text-sm font-bold">Rate Pros Professionalism</p>
						<div className="flex py-2 justify-between items-center">
							<StarRating
								size={0.75}
								rating={rating}
								handleRating={(val) => setRating(val)}
							/>
							{rating > 0 && (
								<p className="font-bold text-primary">
									{formatNumber(rating, 2)}
								</p>
							)}
						</div>
					</div>
					<div className="mb-4">
						<p className="text-sm font-bold">Rate Pros Hygiene</p>
						<div className="flex py-2 justify-between items-center">
							<StarRating
								size={0.75}
								rating={hygienerating}
								handleRating={(val) => setHygieneRating(val)}
							/>
							{hygienerating > 0 && (
								<p className="font-bold text-primary">
									{formatNumber(hygienerating, 2)}
								</p>
							)}
						</div>
					</div>
					<div className="mb-4">
						<BaseTextArea
							placeholder="Additional Comments"
							onChange={(e) => setComments(e.target.value)}
							value={comments}
						/>
					</div>
					<div className="flex gap-1">
						<BaseButton type="submit" loading={false}>
							Submit
						</BaseButton>
					</div>
				</form>
			</Modal>
		</>
	);
}

GigReview.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
