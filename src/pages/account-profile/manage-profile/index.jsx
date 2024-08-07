import { SectionCard } from "./section-card";
import { UseKyc } from "../../../context/kyc-context";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { UseModal } from "../../../context/modal-context";

export function ManageProfile() {
	const { percentageComplete } = UseKyc();
	const {
		handleOpenKyc,
		handleOpenProfile,
		handleOpenFaq,
		handleOpenPassword,
		handleOpenAccount,
	} = UseModal();
	return (
		<div className="flex gap-4 flex-wrap">
			<div className="max-w-sm w-full" onClick={handleOpenProfile}>
				<SectionCard
					title="Profile"
					text="Update your bio, location, skills e.t.c"
				/>
			</div>
			<div className="max-w-sm w-full" onClick={handleOpenAccount}>
				<SectionCard
					title="Account"
					text="Perform unique activities within your account like blocking, deletion, e.t.c"
				/>
			</div>
			<div className="max-w-sm w-full" onClick={handleOpenKyc}>
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
			<div className="max-w-sm w-full" onClick={handleOpenPassword}>
				<SectionCard title="Password" text="Update your password" />
			</div>
			<div className="max-w-sm w-full" onClick={handleOpenFaq}>
				<SectionCard title="FAQ" text="Most of your questions answered here" />
			</div>
			<div className="max-w-sm w-full">
				<SectionCard
					title="Call"
					text="Reach out to us via this line 01-203456"
				/>
			</div>
			<a className="block max-w-sm w-full" href="mailto:info@jobspro.com" target="blank">
				<SectionCard
					title="Email"
					text="Reach out to us via this mail info@jobspro.com"
				/>
			</a>
		</div>
	);
}
