import { useState } from "react";
import { Industry } from "./industry";
import { Resume } from "./resume";
import { Experience } from "./experience";
import { Education } from "./education";
import { Skill } from "./skill";
import { ShortBio } from "./short-bio";
import { WorkingRate } from "./working-rate";
import { Profile } from "./profile";
import { PhoneNumber } from "./phone-number";
import { VerifyPhoneNumber } from "./verfiy-phone-number";

function ExpertProfile() {
	const [step, setStep] = useState(1);

	return (
		<div style={{ width: "100%" }} className="p-4">
			{step === 1 && <Industry gotoNext={() => setStep((prev) => prev + 1)} />}
			{step === 2 && (
				<Resume
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 3 && (
				<Experience
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 4 && (
				<Education
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 5 && (
				<Skill
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 6 && (
				<ShortBio
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 7 && (
				<WorkingRate
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 8 && (
				<Profile
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 9 && (
				<PhoneNumber
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 10 && (
				<VerifyPhoneNumber
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
		</div>
	);
}

export default ExpertProfile;
