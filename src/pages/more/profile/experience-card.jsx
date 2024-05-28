import PropTypes from "prop-types";
import { formatDate } from "../../../helpers/function";
import { EditIcon } from "../../../assets/edit-icon";
import { DeleteIcon } from "../../../assets/delete-icon";
import { useState } from "react";
import { WorkExperience } from "./work-experience";

export function ExperienceCard({ experience }) {
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState(null);

	const handleModal = (item) => {
		setForm(item);
		setOpen(true);
	};

	return (
		<>
			<div onClick={() => null}>
				<p className="text-xs font-bold">{experience.title}</p>
				<p className="text-gray-400 text-xs font-light">
					{experience.placeOfWork} ({formatDate(experience.startDate)} -{" "}
					{formatDate(experience.endDate)})
				</p>
				<p className="text-xs">
					{experience.city}, {experience.country}
				</p>
				<p className="text-xs mt-2">{experience.description}</p>
				<div className="flex gap-2 justify-end mt-2">
					<span
						className="hover:opacity-50 cursor-pointer"
						onClick={() => handleModal(experience)}
					>
						<EditIcon size={0.7} />
					</span>
					<span className="hover:opacity-50 cursor-pointer">
						<DeleteIcon size={0.7} />
					</span>
				</div>
			</div>
			{open && form !== null && (
				<WorkExperience
					open={open}
					handleClose={() => setOpen(false)}
					form={form}
				/>
			)}
		</>
	);
}

ExperienceCard.propTypes = {
	experience: PropTypes.object.isRequired,
};
