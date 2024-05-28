import { useState } from "react";
import { Industry } from "./expert-profile/industry";
import { Skill } from "./expert-profile/skill";
import { ShortBio } from "./expert-profile/short-bio";
import { WorkingRate } from "./expert-profile/working-rate";
import { Profile } from "./expert-profile/profile";
import { Resume } from "./expert-profile/resume";
import { Experience } from "./expert-profile/experience";
import { Education } from "./expert-profile/education";

export function ProProfile() {
	const [isExpert, setIsExpert] = useState(true);
	const [step, setStep] = useState(4);
	return (
		<>
			{step === 1 && (
				<Industry
					gotoNextStep={(bool) => {
						setStep(2);
						setIsExpert(bool);
					}}
				/>
			)}
			{isExpert === false && (
				<>
					{step === 2 && (
						<Skill
							gotoPrevious={() => setStep(1)}
							gotoNextStep={() => setStep(3)}
						/>
					)}
					{step === 3 && (
						<ShortBio
							gotoPrevious={() => setStep(2)}
							gotoNextStep={() => setStep(4)}
						/>
					)}
					{step === 4 && (
						<WorkingRate
							gotoPrevious={() => setStep(3)}
							gotoNextStep={() => setStep(5)}
						/>
					)}
					{step === 5 && <Profile />}
				</>
			)}
			{isExpert === true && (
				<>
					{step === 2 && (
						<Resume
							gotoPrevious={() => setStep(1)}
							gotoNextStep={() => setStep(3)}
						/>
					)}
					{step === 3 && (
						<Experience
							gotoPrevious={() => setStep(2)}
							gotoNextStep={() => setStep(4)}
						/>
					)}
					{step === 4 && (
						<Education
							gotoPrevious={() => setStep(3)}
							gotoNextStep={() => setStep(5)}
						/>
					)}
					{step === 5 && (
						<Skill
							gotoPrevious={() => setStep(4)}
							gotoNextStep={() => setStep(6)}
						/>
					)}
					{step === 6 && (
						<ShortBio
							gotoPrevious={() => setStep(5)}
							gotoNextStep={() => setStep(7)}
						/>
					)}
					{step === 7 && (
						<WorkingRate
							gotoPrevious={() => setStep(6)}
							gotoNextStep={() => setStep(8)}
						/>
					)}
					{step === 8 && <Profile />}
				</>
			)}
		</>
	);
}
