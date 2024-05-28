import { useState } from "react";
import { WorkExperience } from "./work-experience";
import { ExperienceCard } from "./experience-card";

const experience = [
	{
		title: "Experience",
		placeOfWork: "Experience placeholder",
		city: "city",
		country: "country",
		startDate: new Date(),
		endDate: new Date(),
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima corporis beatae quibusdam blanditiis autem, molestiae nihil cumque vitae at eaque ut, quo, consectetur rem unde. Quo est totam consequuntur maiores pariatur sed rem possimus nesciunt, officia beatae eligendi distinctio aliquam.",
	},
];

export function WorkExperienceDescription() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="border border-primary rounded-lg p-2 mb-2">
				<div className="flex justify-between mb-4">
					<p className="text-base">Work Experience</p>
					<span
						onClick={() => setOpen(true)}
						className="cursor-pointer h-5 w-5 border border-gray-600 rounded-full flex justify-center items-center text-gray-600 hover:bg-gray-100 text-sm"
					>
						+
					</span>
				</div>
				<div className="flex gap-2 items-center flex-wrap">
					{experience.map((item) => (
						<ExperienceCard key={item.title} experience={item} />
					))}
				</div>
			</div>

			{open && (
				<WorkExperience open={open} handleClose={() => setOpen(false)} />
			)}
		</>
	);
}
