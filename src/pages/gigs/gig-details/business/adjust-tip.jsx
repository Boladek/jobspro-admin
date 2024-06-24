import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseInput } from "../../../../component/input";
import profileAxios from "../../../../helpers/profileAxios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { formatNumber } from "../../../../helpers/function";

export function AdjustTip({ open, handleClose, openReview }) {
	const location = useLocation();
	const { gigData } = location.state;
	const { handleSubmit } = useForm();
	const [tip, setTip] = useState(0);
	const [loading, setLoading] = useState(false);

	const onSubmit = () => {
		setLoading(true);
		profileAxios
			.post("/gigs/adjust-tip", {
				gigId: gigData.uuid,
				newTip: tip,
			})
			.then((res) => {
				toast.success(res.message);
				openReview();
				handleClose();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	const handleChange = (e) => {
		setTip(e.target.value);
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form
				className="py-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{loading && <Overlay message="Updating Tip" />}
				<div>
					<p className={`text-primary text-3xl font-bold mb-2`}>Adjust Tip</p>
					<p className="text-sm">
						Previously stated amount: {formatNumber(gigData.tips)}
					</p>

					<div className="my-2">
						<BaseInput
							placeholder="1000"
							onChange={handleChange}
							type="number"
							label="Additional Tip"
							value={tip}
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
