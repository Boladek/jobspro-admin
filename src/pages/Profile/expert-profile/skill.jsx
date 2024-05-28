import { useState } from "react";
import PropTypes from "prop-types";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";

export function Skill({ gotoPrevious, gotoNextStep }) {
	const [loading, setLoading] = useState(false);
	const [selectedText, setSelectedText] = useState([]);
	// const [open, setOpen] = useState(false);
	// const [openSuccess, setOpenSuccess] = useState(false);

	const onSubmit = () => {
		// console.log({ data });
		setLoading(true);
		profileAxios
			.post("/profile/skillset", {
				skills: selectedText,
			})
			.then((res) => {
				toast.success(res.message);
				gotoNextStep();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	const handleKeyPress = (e) => {
		const { key } = e;

		if (key === "Enter") {
			const { value } = e.target;
			setSelectedText((prev) => [...prev, value]);
			e.target.value = "";
		}
	};

	const handleCancel = (text) => {
		setSelectedText((prev) => prev.filter((item) => item !== text));
	};

	return (
		<div
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
		>
			{loading && <Overlay message="Adding Skills" />}
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div>
					<p className={`text-primary text-3xl font-bold`}>Skill</p>
					<p className="text-sm text-gray-500 mb-4">
						We need to get a sense of your education, experience and skills.
						It’s quickest to import your information
					</p>
					<div className="border rounded-md p-6 mb-4">
						<div className="mb-2">
							<BaseInput label="Enter skill" onKeyPress={handleKeyPress} />
						</div>
						<div className="flex gap-2">
							{selectedText.map((text) => (
								<div
									key={text}
									className={`flex gap-2 py-1 px-2 border-2 border-primary text-primary text-xs rounded-full items-center font-bold`}
								>
									<span>{text}</span>
									<span
										onClick={() => handleCancel(text)}
										className="material-symbols-outlined cursor-pointer"
									>
										&#x2716;
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec" onClick={gotoPrevious}>
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" onClick={onSubmit}>
						Next
					</BaseButton>
				</div>
			</div>
		</div>
	);
}

Skill.propTypes = {
	gotoNextStep: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
