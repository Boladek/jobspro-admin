import { func } from "prop-types";
import { SideWrapper } from "../../../../component/side-wrapper";
import { ProgressBar } from "../../../../component/admin/progress-bar";
import { FaArrowCircleRight } from "react-icons/fa";
import { UseCommission } from "../../../../context/commission-context";
import { CreateCommission } from "./create-commission";
import { PaymentModule } from "./payment-module";
import { UpdateCommission } from "./update-commission";

export function JobsSettings({ handleClose }) {
	const { step, handleStep } = UseCommission();
	return (
		<SideWrapper handleClose={handleClose} title="Jobs Settings">
			<div className="w-full sm:w-[500px]">
				{step === 1 && (
					<div className="grid grid-cols-1 gap-8 pt-8 border-t">
						<div
							className="flex p-4 rounded-md border items-center gap-1"
							onClick={() => handleStep(2)}
						>
							<div className="w-1/3">
								<p className="text-xs font-bold">Create Commisions</p>
								<div className="w-12">
									<ProgressBar color="#FF7A00" />
								</div>
							</div>
							
							<div className="flex-1 text-tiny">Create New Commissions</div>
							<div className="w-1/12">
								<FaArrowCircleRight className="text-[#1C4486] text-xl" />
							</div>
						</div>

						<div
							className="flex p-4 rounded-md border items-center gap-1"
							onClick={() => handleStep(3)}
						>
							<div className="w-1/3">
								<p className="text-xs font-bold">Commissions</p>
								<div className="w-12">
									<ProgressBar color="#FF7A00" />
								</div>
							</div>
							<div className="flex-1 text-tiny">
								Update Commissions for business
							</div>
							<div className="w-1/12">
								<FaArrowCircleRight className="text-[#1C4486] text-xl" />
							</div>
						</div>

						<div
							className="flex p-4 rounded-md border items-center gap-1"
							onClick={() => handleStep(4)}
						>
							<div className="w-1/3">
								<p className="text-xs font-bold">Payment Module</p>
								<div className="w-12">
									<ProgressBar color="#FF7A00" />
								</div>
							</div>
							<div className="flex-1 text-tiny">Set payment structure</div>
							<div className="w-1/12">
								<FaArrowCircleRight className="text-[#1C4486] text-xl" />
							</div>
						</div>
					</div>
				)}

				{step === 3 && <UpdateCommission />}
				{step === 2 && <CreateCommission />}
				{step === 4 && <PaymentModule />}
			</div>
		</SideWrapper>
	);
}

JobsSettings.propTypes = {
	handleClose: func,
};
