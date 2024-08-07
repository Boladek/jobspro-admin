import PropTypes from "prop-types";
import { useState } from "react";
import { UseAuth } from "../../../context/auth-context";
import { PenIcon } from "../../../assets/pen-icon";
import { MdDeleteSweep } from "react-icons/md";
import { ProgressBar } from "../../../component/admin/progress-bar";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";
import { EducationExperienceModal } from "../../../component/education-experience-modal";
import { IoIosAddCircle } from "react-icons/io";

function formatExperience(date) {
	const newDate = new Date(date);
	const formatter = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const parts = formatter.formatToParts(newDate);
	const month = parts.find((part) => part.type === "month").value.toUpperCase();
	// const day = parts.find((part) => part.type === "day").value;
	const year = parts.find((part) => part.type === "year").value;
	return `${month}, ${year}`;
}

export function Education() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);

	return (
		<div className="pr-2">
			<div className="flex justify-between">
				{/* <p className="text-xs font-bold mb-1">Work Experience</p> */}
				<div className="py-1 px-6 rounded-full border bg-gray-50 w-fit  text-adminPrimary border-adminPrimary mb-2">
					Education History
				</div>

				{/* <div onClick={() => setOpen(true)} className="w-15">
					<PenIcon />
				</div> */}
				<IoIosAddCircle
					onClick={() => setOpen(true)}
					className="text-2xl text-[#667085]"
				/>
			</div>
			{user?.educationHistory.length > 0 ? (
				<div className="grid grid-cols-1 gap-2">
					{user.educationHistory.map((item) => (
						<ExperienceCard experience={item} key={item.uuid} />
					))}
				</div>
			) : (
				<p className="italic text-xs" onClick={() => setOpen(true)}>
					Please click here to add education history
				</p>
			)}

			{open && (
				<EducationExperienceModal
					open={open}
					handleClose={() => setOpen(false)}
				/>
			)}
		</div>
	);
}

function ExperienceCard({ experience }) {
	const { refetch } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState(true);

	function handleForm(item) {
		setForm(item);
		setOpen(true);
	}

	function deleteExperience(id) {
		setLoading(true);
		profileAxios
			.delete(`/profile/education-history/${id}`)
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	}

	return (
		<>
			{loading && <Overlay message="Deleting Education History" />}
			<div className="grid grid-cols-1 gap-1">
				<div className="flex justify-between">
					<div>
						<div className="flex gap-2 items-center">
							<span className="text-[#0030DC] bg-[#E5EEFF] px-4 py-2 rounded-md text-xs font-semibold">
								{experience.degree} {experience.discipline}
							</span>
							<div>
								<span className="text-tiny text-gray-500 font-bold">
									{formatExperience(experience.startDate)} -{" "}
									{formatExperience(experience.endDate)}{" "}
								</span>
								<div className="w-16">
									<ProgressBar thickness={0.5} color="#212121" />
								</div>
							</div>
						</div>
					</div>
					<div className="flex gap-1 items-center">
						<div onClick={() => deleteExperience(experience.id)}>
							<MdDeleteSweep className="text-xl text-[#667085]" />
						</div>
						<div onClick={() => handleForm(experience)} className="w-15">
							<PenIcon />
						</div>
					</div>
				</div>
				<div className="text-xs font-bold text-gray-400">
					{experience.higherInstitution}
				</div>
				<div className="text-xs font-light">{experience.description}</div>
			</div>
			{open && (
				<EducationExperienceModal
					open={open}
					handleClose={() => setOpen(false)}
					form={form}
				/>
			)}
		</>
	);
}

ExperienceCard.propTypes = {
	experience: PropTypes.object,
};
