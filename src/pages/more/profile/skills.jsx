import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { BaseSelect } from "../../../component/select";
import { toast } from "react-toastify";
import { useState } from "react";
import profileAxios from "../../../helpers/profileAxios";
import { UseAuth } from "../../../context/auth-context";
import { BaseInput } from "../../../component/input";
import { Overlay } from "../../../component/overlay-component";

export function Skills({ open, handleClose }) {
	const { refetch } = UseAuth();
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
				refetch();
				handleClose();
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
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<div className="w-full p-2" style={{ maxWidth: 500, width: "100%" }}>
				{loading && <Overlay message="Adding Skills" />}
				<div>
					<p className={`text-primary text-3xl font-bold`}>Skill</p>
					<p className="text-sm text-gray-500 mb-4">
						We need to get a sense of your education, experience and skills.
						It’s quickest to import your information
					</p>
					<div className="mb-2">
						<BaseInput label="Enter skill" onKeyPress={handleKeyPress} />
					</div>
					<div className="flex gap-2 mb-4">
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
				<div className="flex justify-end gap-2">
					<div className="w-1/2">
						<BaseButton type="button" variant="sec" onClick={handleClose}>
							Cancel
						</BaseButton>
					</div>
					<div className="w-1/2">
						<BaseButton type="button" onClick={onSubmit}>
							Save
						</BaseButton>
					</div>
				</div>
			</div>
		</Modal>
	);
}

Skills.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
