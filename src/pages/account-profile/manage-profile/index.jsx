import React from "react";
import { SectionCard } from "./section-card";
import { UseKyc } from "../../../context/kyc-context";
import { ProgressBar } from "../../../component/admin/progress-bar";

export function ManageProfile() {
	const { percentageComplete } = UseKyc();
	return (
		<div className="flex gap-4 flex-wrap">
			<div className="max-w-sm w-full">
				<SectionCard
					isReversed={false}
					title="Kyc"
					text="Upload your documents to get the best"
					progressSection={
						<div>
							<p className="text-sm">{percentageComplete}%</p>
							<ProgressBar
								percent={percentageComplete}
								thickness={1.3}
								bg="rgba(0,0,0,.2)"
							/>
						</div>
					}
				/>
			</div>
			<div className="max-w-sm w-full">
				<SectionCard title="Password" text="Update your password" />
			</div>
			<div className="max-w-sm w-full">
				<SectionCard
					title="Account"
					text="Update your bio, bank information, e.t.c"
				/>
			</div>
			<div className="max-w-sm w-full">
				<SectionCard title="FAQ" text="Most of your questions answered here" />
			</div>
			<div className="max-w-sm w-full">
				<SectionCard
					title="Call"
					text="Reach out to us via this line 01-203456"
				/>
			</div>
			<div className="max-w-sm w-full">
				<SectionCard
					title="Email"
					text="Reach out to us via this mail info@jobspro.com"
				/>
			</div>
		</div>
	);
}
