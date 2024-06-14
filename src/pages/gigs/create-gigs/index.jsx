import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { GigPreview } from "./gig-preview";
import { GigAddress } from "./gig-address";
import { useNavigate } from "react-router-dom";
import { GigBudget } from "./gig-budget";
import { GigInformation } from "./gig-informtion";
import { GigDate } from "./gig-date";

const steps = [
	"Gig Address",
	"Budget Information",
	"Gig Information",
	"Gig Date",
	"Gig Preview",
];

function CreateGigPage() {
	const navigate = useNavigate();
	const [step, setStep] = useState(steps[0]);
	const [form, setForm] = useState({});

	// function setStep(arg) {
	// 	setStep(arg);
	// }

	function handleForm(data) {
		setForm((prev) => ({ ...prev, ...data }));
	}

	console.log({ form });
	// console.log({ step });

	return (
		<div className="max-w-screen-xl mx-auto bg-white rounded-md p-4 h-full">
			<>
				<div className="flex">
					<div
						className="p-3 rounded-full flex justify-center items-center hover:text-primary cursor-pointer"
						onClick={() => navigate(-1)}
					>
						<MdArrowBackIos />
					</div>
					<div className="flex-1 text-center text-2xl font-bold">{step}</div>
				</div>
				{step === steps[0] && (
					<GigAddress
						handleForm={handleForm}
						gotoNextStep={() => setStep(steps[1])}
						form={form}
					/>
				)}
				{step === steps[1] && (
					<GigBudget
						handleForm={handleForm}
						gotoNextStep={() => setStep(steps[2])}
					/>
				)}
				{step === steps[2] && (
					<GigInformation
						handleForm={handleForm}
						gotoNextStep={() => setStep(steps[3])}
					/>
				)}
				{step === steps[3] && (
					<GigDate
						handleForm={handleForm}
						gotoNextStep={() => setStep(steps[4])}
					/>
				)}
				{step === steps[4] && (
					<GigPreview
						form={form}
						handleStep={(arg) => setStep(arg)}
						steps={steps}
					/>
				)}
			</>
		</div>
	);
}

export default CreateGigPage;
