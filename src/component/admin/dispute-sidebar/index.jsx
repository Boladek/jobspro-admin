import { SideWrapper } from "../../side-wrapper";
import PropTypes from "prop-types";
import { ProgressBar } from "../progress-bar";

import { useState } from "react";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";

export function DisputeSideBar({ open, handleClose }) {
	const [step, setStep] = useState(1);
	return (
		<SideWrapper open={open} handleClose={handleClose}>
			{step === 1 && <Step1 gotoNextStep={() => setStep(2)} />}
			{step === 2 && (
				<Step2 gotoNextStep={() => setStep(3)} goBack={() => setStep(1)} />
			)}
			{step === 3 && <Step3 goBack={() => setStep(2)} />}
		</SideWrapper>
	);
}

DisputeSideBar.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
};
