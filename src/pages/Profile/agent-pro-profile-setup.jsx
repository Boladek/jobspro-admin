import { useState } from "react";
import { PhoneNumber } from "./expert-profile/phone-number";
import { VerifyPhoneNumber } from "./expert-profile/verfiy-phone-number";
import { Industry } from "./expert-profile/industry";
import { Experience } from "./expert-profile/experience";
import { Skill } from "./expert-profile/skill";
import { ShortBio } from "./expert-profile/short-bio";
import { WorkingRate } from "./expert-profile/working-rate";

function AgentProSetupFlow() {
	const [step, setStep] = useState(5);

	return (
		<>
			{step === 1 && <PhoneNumber gotoNextStep={() => setStep(2)} />}
			{step === 2 && (
				<VerifyPhoneNumber
					gotoPrevious={() => setStep(1)}
					gotoNextStep={() => setStep(3)}
				/>
			)}
			{step === 3 && <div>Pro profile Details</div>}
			{step === 4 && <div>Pro profile picture</div>}
			{step === 5 && (
				<Industry
					gotoPrevious={() => setStep(4)}
					gotoNextStep={() => setStep(6)}
				/>
			)}
			{step === 6 && (
				<Experience
					gotoPrevious={() => setStep(5)}
					gotoNextStep={() => setStep(7)}
				/>
			)}
			{step === 7 && (
				<Skill
					gotoPrevious={() => setStep(6)}
					gotoNextStep={() => setStep(8)}
				/>
			)}
			{step === 8 && (
				<ShortBio
					gotoPrevious={() => setStep(7)}
					gotoNextStep={() => setStep(9)}
				/>
			)}
			{step === 9 && (
				<WorkingRate
					gotoPrevious={() => setStep(8)}
					gotoNextStep={() => setStep(10)}
				/>
			)}
		</>
	);
}

export default AgentProSetupFlow;
