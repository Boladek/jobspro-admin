// import { useState } from "react";
import { Modal } from "./modal";
import { BaseButton } from "./button";
import education from "../assets/education-experience.png";
import { colors } from "../helpers/theme";
import { BaseInput } from "./input";
import { BaseTextArea } from "./text-area";
import PropTypes from "prop-types";

export function EducationExperienceModal({ open, handleClose, form = {} }) {
	return (
		<Modal open={open} handleClose={handleClose} maxWidth={750}>
			<form className="w-full p-2">
				<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
					<div className="hidden md:block">
						<img
							src={education}
							alt="Illustration"
							height="50"
							className="h-24"
						/>
					</div>
					<p className={`font-bold text-primary text-2xl`}>
						Add Education Experience
					</p>
				</div>
				<div className="block gap-4 mb-4 md:flex">
					<div className="w-full md:w-1/2">
						<div className="mb-2">
							<BaseInput label="Title" defaultValue={form.title} />
						</div>
						<div className="mb-2">
							<BaseInput
								label="Place of work"
								defaultValue={form.placeOfWork}
							/>
						</div>
						<div className="mb-2">
							<BaseInput label="City" defaultValue={form.city} />
						</div>
						<div className="mb-2">
							<BaseInput label="Country" defaultValue={form.country} />
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<div className="flex gap-2">
							<div className="mb-2">
								<BaseInput
									label="Start Date"
									defaultValue={form.startDate}
									type="date"
								/>
							</div>
							<div className="mb-2">
								<BaseInput label="End Date" type="date" />
							</div>
						</div>
						<div className="mb-2">
							<BaseTextArea label="Description" />
						</div>
					</div>
				</div>
				<hr />
				<div className="flex justify-center gap-2 mt-4">
					<div className="w-1/4">
						<BaseButton>Cancel</BaseButton>
					</div>
					<div className="w-1/4">
						<BaseButton>Save</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

EducationExperienceModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
