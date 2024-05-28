import { useState } from "react";
import { IndividualTierSummary } from "./individual-tier-summary";
import { IndividualBvn } from "./individual-bvn";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Step5 } from "./step5";

function Tier1() {
	const [step, setStep] = useState(1);
	return (
		<>
			{step === 1 && <IndividualTierSummary gotoNextPage={() => setStep(2)} />}
			{step === 2 && <IndividualBvn gotoNextPage={() => setStep(3)} />}
            {step === 3 && <Step3 gotoNextPage={() => setStep(4)} />}
            {step === 4 && <Step4 gotoNextPage={() => setStep(5)} />}
            {step === 5 && <Step5 gotoNextPage={() => setStep(5)} />}
		</>
	);
}

export default Tier1;
