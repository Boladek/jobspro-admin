import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import avatar from "../../../assets/profile-avatar.png";
import bump from "../../../assets/bump.png";
import info from "../../../assets/info.png";
import illustration from "../../../assets/illustration.png";
import { BaseSelect } from "../../../component/select";
import { Modal } from "../../../component/modal";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";

function ExpertProfile() {
	const [step, setStep] = useState(3);

	return (
		<div style={{ width: "100%" }} className="p-4">
			{step === 1 && <Step1 gotoNext={() => setStep((prev) => prev + 1)} />}
			{step === 2 && (
				<Step2
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
			{step === 3 && (
				<Step3
					gotoNext={() => setStep((prev) => prev + 1)}
					gotoPrevious={() => setStep((prev) => prev - 1)}
				/>
			)}
		</div>
	);
}

export default ExpertProfile;
