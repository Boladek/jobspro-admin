import React, { useState } from "react";
import { RequirementsIcon } from "../../../../assets/requirement-icon";
import { BvnSubmission } from "./bvn-submission";
import { UseKyc } from "../../../../context/kyc-context";
import { FaceCapturePage } from "./face-capture-page";
import { UseAuth } from "../../../../context/auth-context";
import { BusinessVerification } from "./business-verification";

export function Tier1() {
	const { user } = UseAuth();
	const { refetch } = UseKyc();
	const [step, setStep] = useState(1);
	const [bvn, setBvn] = useState("");

	return (
		<div>
			{step === 1 && (
				<>
					{user.userType !== "business" && (
						<>
							<div
								className="p-4 border rounded-md border-adminPrimary flex gap-4 items-center mb-4"
								onClick={() => setStep(2)}
							>
								<div className="p-2 rounded-full bg-primary/30 w-fit">
									<RequirementsIcon />
								</div>
								<div className="flex-1">
									<p className="font-bold text-sm text-adminPrimary">BVN</p>
									<p className="text-xs">Verify your BVN</p>
								</div>
							</div>
							<div
								className="p-4 border rounded-md border-adminPrimary flex gap-4 items-center"
								onClick={() => setStep(3)}
							>
								<div className="p-2 rounded-full bg-primary/30 w-fit">
									<RequirementsIcon />
								</div>
								<div className="flex-1">
									<p className="font-bold text-sm text-adminPrimary">
										Face Capture
									</p>
									<p className="text-xs">
										Get a face shot by following the instructions that will be
										provided.
									</p>
								</div>
							</div>
						</>
					)}
					{user.userType === "business" && (
						<div
							className="p-4 border rounded-md border-adminPrimary flex gap-4 items-center"
							onClick={() => setStep(2)}
						>
							<div className="p-2 rounded-full bg-primary/30 w-fit">
								<RequirementsIcon />
							</div>
							<div className="flex-1">
								<p className="font-bold text-sm text-adminPrimary">
									Business Verification
								</p>
								<p className="text-xs">
									Please provide us with your CAC registration number.
								</p>
							</div>
						</div>
					)}
				</>
			)}

			{user.userType !== "business" ? (
				<>
					{step === 2 && (
						<BvnSubmission
							gotoNextPage={() => setStep(3)}
							handleBVN={(arg) => {
								setBvn(arg);
								refetch();
							}}
							goBack={() => setStep(1)}
						/>
					)}

					{step === 3 && (
						<FaceCapturePage
							gotoNextPage={() => {
								setStep(4);
								refetch();
							}}
							bvn={bvn}
							goBack={() => setStep(1)}
						/>
					)}
				</>
			) : (
				<>
					{step === 2 && (
						<BusinessVerification
							gotoNextPage={() => {
								setStep(4);
								refetch();
							}}
							goBack={() => setStep(1)}
						/>
					)}
				</>
			)}
		</div>
	);
}
