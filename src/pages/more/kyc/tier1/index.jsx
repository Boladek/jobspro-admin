import PropTypes from "prop-types";
import { useState } from "react";
import { IndividualTierSummary } from "./individual-tier-summary";
import { IndividualBvn } from "./individual-bvn";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Step5 } from "./step5";
import { BusinessVerification } from "./business-verification";
import { useSelector } from "react-redux";

function Tier1({ kycData, refetch }) {
	const { user } = useSelector((state) => state.auth);
	const [step, setStep] = useState(1);
	const [bvn, setBvn] = useState("");
	return (
		<>
			{user.userType === "business" ? (
				<>
					{step === 1 && (
						<IndividualTierSummary
							percent={kycData.percentageComplete ?? 0}
							gotoNextPage={() => setStep(2)}
						/>
					)}
					{step === 2 && (
						<BusinessVerification
							gotoNextPage={() => {
								setStep(3);
								refetch();
							}}
						/>
					)}
					{step === 3 && <Step5 gotoNextPage={() => setStep(5)} />}
				</>
			) : (
				<>
					{step === 1 && (
						<IndividualTierSummary
							percent={kycData.percentageComplete ?? 0}
							gotoNextPage={() => setStep(2)}
						/>
					)}
					{step === 2 && (
						<IndividualBvn
							gotoNextPage={() => setStep(3)}
							handleBVN={(arg) => {
								setBvn(arg);
								refetch();
							}}
						/>
					)}
					{step === 3 && <Step3 gotoNextPage={() => setStep(4)} />}
					{step === 4 && (
						<Step4
							gotoNextPage={() => {
								setStep(5);
								refetch();
							}}
							bvn={bvn}
						/>
					)}
					{step === 5 && <Step5 gotoNextPage={() => setStep(5)} />}
				</>
			)}
		</>
	);
}

Tier1.propTypes = {
	kycData: PropTypes.object,
	refetch: PropTypes.func,
};

export default Tier1;
