import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { UseCommission } from "../../../../../context/commission-context";
import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { PaymentPartners } from "./payment-partners";
import { PaymentMode } from "./payment-mode";
import { useState } from "react";

export function PaymentModule() {
	const { handleStep } = UseCommission();
	const [step, setStep] = useState(1);

	return (
		<div>
			{step === 1 && (
				<div className="flex gap-2 items-center mb-4">
					<span onClick={() => handleStep(1)}>
						<FaArrowLeft className="text-xl" />
					</span>
					<span className="p-2 rounded-full text-xs bg-[#F1F2FF] text-[#3F0799]">
						Payment Module
					</span>
				</div>
			)}

			{step === 1 && (
				<div className="grid grid-cols-1 gap-8 pt-8 border-t">
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						onClick={() => setStep(2)}
					>
						<div className="w-1/3">
							<p className="text-xs font-bold">Payment Partners</p>
							<div className="w-12">
								<ProgressBar color="#FF7A00" />
							</div>
						</div>
						<div className="flex-1 text-tiny">
							Management of payment partners
						</div>
						<div className="w-1/12">
							<FaArrowCircleRight className="text-[#1C4486] text-xl" />
						</div>
					</div>

					<div
						className="flex p-4 rounded-md border items-center gap-1"
						onClick={() => setStep(3)}
					>
						<div className="w-1/3">
							<p className="text-xs font-bold">Payment Mode</p>
							<div className="w-12">
								<ProgressBar color="#FF7A00" />
							</div>
						</div>
						<div className="flex-1 text-tiny">Select mode of payments</div>
						<div className="w-1/12">
							<FaArrowCircleRight className="text-[#1C4486] text-xl" />
						</div>
					</div>

					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => handleStep(4)}
					>
						<div className="w-1/3">
							<p className="text-xs font-bold">Payment Authorization</p>
							<div className="w-12">
								<ProgressBar color="#FF7A00" />
							</div>
						</div>
						<div className="flex-1 text-tiny">
							Set passwords and give permissions for manual payments
						</div>
						<div className="w-1/12">
							<FaArrowCircleRight className="text-[#1C4486] text-xl" />
						</div>
					</div>
				</div>
			)}
			{step === 2 && <PaymentPartners goBack={() => setStep(1)} />}
			{step === 3 && <PaymentMode goBack={() => setStep(1)} />}
		</div>
	);
}
