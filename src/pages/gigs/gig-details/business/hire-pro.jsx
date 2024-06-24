import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../../../component/modal";
import { BaseButton } from "../../../../component/button";
import { Overlay } from "../../../../component/overlay-component";
import { BaseTextArea } from "../../../../component/text-area";

export function HirePro({ open, handleClose, pro }) {
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
					<p className={`text-primary text-3xl font-bold`}>Cancel Gig</p>
					<p className="text-sm text-gray-500 mb-2">
						Please Input reason for gig cancellation.
					</p>
					<div className="p-2 flex gap-2 items-center">
						<input
							type="radio"
							name="reason"
							id="one"
							value="Reason One"
							onChange={handleChange}
						/>
						<label htmlFor="one" className="text-sm">
							Reason 1
						</label>
					</div>
					<hr />
					<div className="p-2 flex gap-2 items-center">
						<input
							type="radio"
							name="reason"
							id="two"
							value="Reason One"
							onChange={handleChange}
						/>
						<label htmlFor="two" className="text-sm">
							Reason 2
						</label>
					</div>
					<hr />
					<div className="p-2 flex gap-2 items-center mb-2">
						<input
							type="radio"
							name="reason"
							id="other"
							value="other"
							onChange={handleChange}
						/>
						<label htmlFor="other" className="text-sm">
							Other
						</label>
					</div>

					{reason === "other" && (
						<div className="my-2">
							<BaseTextArea
								placeholder="Enter Cancellation Reason"
								onChange={(e) => setOtherReason(e.target.value)}
							/>
						</div>
					)}
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

HirePro.propTypes = {
	pro: PropTypes.object,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
