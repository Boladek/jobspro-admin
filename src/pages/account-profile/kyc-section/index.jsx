import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import { UseAuth } from "../../../context/auth-context";
import traffic from "../../../assets/traffic-cone.svg";
import { UseKyc } from "../../../context/kyc-context";
import { ProgressBar } from "../../../component/admin/progress-bar";
// import { IndividualKYC } from "./individual";
// import { BusinessKYC } from "./business";
import { Tier1 } from "./tier1";
import { StepWrapper } from "./step-wrapper";

export function KycSection() {
	const { openKyc, handleCloseKyc } = UseModal();
	const { user } = UseAuth();
	const { percentageComplete, tier } = UseKyc();

	return (
		<SideWrapper handleClose={handleCloseKyc} title="KYC" open={openKyc}>
			<div className="flex gap-2 mb-4">
				<img src={traffic} alt="Traffic Cone" />
				<div>
					<div className="flex gap-2 mb-2">
						<div className="p-2 rounded-full bg-[#FFDE16] text-tiny font-bold">
							In progress
						</div>
						<div className="w-28 p-1 flex items-center gap-2">
							<ProgressBar
								percent={percentageComplete}
								color="green"
								thickness={1.3}
								bg="rgba(0,0,0,.2)"
							/>
							<p className="text-sm text-gray-400">{percentageComplete}%</p>
						</div>
					</div>
					<p className="text-sm text-gray-400 px-2">
						Complete your KYC documentation to have full access to all jobs pro
						features
					</p>
				</div>
			</div>
			<div className="p-4 bg-[#4440FF] rounded-lg flex justify-between items-center text-white">
				<div className="w-fit p-1 px-3 rounded-full bg-[#00E585] text-xs font-semibold">
					Tier {tier}
				</div>
				<div className="w-fit">
					<p className="text-tiny mb-1">Account</p>
					<div className="w-16 mb-1">
						<ProgressBar thickness={1.5} color="#FEDF00" />
					</div>
					<p className="text-xs capitalize">{user.userType} Account</p>
				</div>
				<div className="w-fit">
					<p className="text-tiny mb-1">Transaction Limit</p>
					<div className="w-16 mb-2">
						<ProgressBar thickness={1.5} color="#FEDF00" />
					</div>
					<p className="text-xs">NGN {10000} day</p>
				</div>
			</div>
			<div className="py-4">
				<StepWrapper title="Tier 1">
					<Tier1 />
				</StepWrapper>
				<br />
				<StepWrapper title="Tier 2">
					<div>Unavailable</div>
				</StepWrapper>
				<br />
				<StepWrapper title="Tier 3">
					<div>Unavailable</div>
				</StepWrapper>
				<br />
				<StepWrapper title="Tier 4">
					<div>Unavailable</div>
				</StepWrapper>
				<br />
				<StepWrapper title="Tier 5">
					<div>Unavailable</div>
				</StepWrapper>
			</div>
		</SideWrapper>
	);
}
