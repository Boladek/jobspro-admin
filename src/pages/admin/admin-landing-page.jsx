import { useEffect } from "react";
import { StatsSummary } from "./landing-page/stats-summary";
import { JobsPosted } from "./landing-page/jobs-posted";

function AdminLandingPage() {
	useEffect(() => {
		document.title = "Jobs Pro | Admin Dashboard";
	}, []);

	return (
		<div className="h-full">
			<div className="mb-4 w-full overflow-x-auto">
				<StatsSummary />
			</div>
			<div className="flex w-full gap-2">
				<div className="w-96">
					<JobsPosted />
				</div>
				<div className="flex-1 border">
					<div className="border w-full">Chart Top</div>
					<div className="border w-full flex">
						<div className="2/3">Chart</div>
						<div className="1/3">Wallets</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AdminLandingPage;
