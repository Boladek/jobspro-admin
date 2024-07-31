import { IoArrowBack } from "react-icons/io5";
import { func } from "prop-types";
import { BaseTextArea } from "../../../component/text-area";
import { SquareButton } from "../../../component/square-button";
import { useState } from "react";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";

export function FeedBack({ goBack }) {
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState("");

	const submit = (e) => {
		e.preventDefault();
		setLoading(true);
		profileAxios
			.post("/profile/feedback", {
				feedback,
				title: "",
			})
			.then(() => {
				toast.success("Thank you for your feedback. We appreciate your input!");
				setTimeout(() => {
					goBack();
				}, 3000);
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<div>
			{loading && <Overlay message="Submitting feedback" />}
			<div className="text-xs flex gap-4 items-center">
				<div className="bg-black p-1.5 rounded-full w-fit" onClick={goBack}>
					<IoArrowBack className="text-white" />
				</div>
				<div className="p-2 px-4 rounded-full border bg-gray-50 text-adminPrimary font-bold w-fit select-none">
					Feedback
				</div>
			</div>

			<form className="grid grid-cols-1 gap-4 mt-4" onSubmit={submit}>
				<div className="text-xs text-gray-400">
					We exist to improve, how can we serve you better
				</div>
				<div>
					<div className="mb-4">
						<BaseTextArea
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
						/>
					</div>
					<div>
						<SquareButton type="submit">Submit Feedback</SquareButton>
					</div>
				</div>
			</form>
		</div>
	);
}

FeedBack.propTypes = {
	goBack: func.isRequired,
};
