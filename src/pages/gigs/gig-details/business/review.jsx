import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseInput } from "../../../../component/input";
import { BaseTextArea } from "../../../../component/text-area";
import { generateArray } from "../../../../helpers/function";
import { StarIcon } from "../../../../assets/admin/star-icon";

export function Review({ open, handleClose }) {
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
					<p className={`text-primary text-3xl font-bold mb-2`}>Leave Review</p>

					<div>
						<p>Rate Pros Professionalism</p>
						<div className="flex gap-2 items-center">
							{generateArray(5).map((_, index) => (
								<span key={Math.random()} onClick={() => console.log(index)}>
									<StarIcon size={1} />
								</span>
							))}
						</div>
					</div>
					<div>
						<p>Rate Pros Punctuality</p>
						<div className="flex gap-2 items-center">
							{generateArray(5).map((_, index) => (
								<span key={Math.random()} onClick={() => console.log(index)}>
									<StarIcon size={1} />
								</span>
							))}
						</div>
					</div>
					<div className="my-2">
						<BaseTextArea onChange={handleChange} label="Comments" />
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

Review.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
