import { generateArray } from "../../../../helpers/function";
import { JobsCard } from "./jobs-card";

export function JobsSection() {
	return (
		<div className="grid grid-cols-1 gap-4 pt-4">
			{generateArray(5).map(() => (
				<JobsCard key={Math.random()} />
			))}
		</div>
	);
}
