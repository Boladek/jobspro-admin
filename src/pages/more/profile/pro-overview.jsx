import { ShortBioDescription } from "./short-bio-description";
import { SkillsDescription } from "./skills-description";
import { SpecializationDescription } from "./specialization-description";
// import { WorkExperienceDescription } from "./work-experience-description";
import { WorkRateDescription } from "./work-rate-description";

export function ProOverview() {
	return (
		<div className="md:flex gap-2 pt-2">
			<div className="w-full md:w-2/5">
				<div className="mb-2">
					<WorkRateDescription />
				</div>
				<div className="mb-2">
					<ShortBioDescription />
				</div>
			</div>
			<div className="flex-1">
				<div className="mb-2">
					<SpecializationDescription />
				</div>
				{/* <div className="mb-2">
					<WorkExperienceDescription />
				</div> */}
				<div className="mb-2">
					<SkillsDescription />
				</div>
			</div>
		</div>
	);
}
