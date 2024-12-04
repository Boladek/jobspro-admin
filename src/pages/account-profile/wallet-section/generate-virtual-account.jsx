import { BaseInput } from "../../../component/input";
import { Modal } from "../../../component/modal";
import PropTypes from "prop-types";
import { BaseSelect } from "../../../component/select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Overlay } from "../../../component/overlay-component";
import { SquareButton } from "../../../component/square-button";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { SuccessInfo } from "../../../component/success-info";
import { UseAuth } from "../../../context/auth-context";

export function GenerateVirtualAccounts({ open, handleClose, refetch }) {
	const { user } = UseAuth();
	const [generating, setGenerating] = useState(false);
	const [step, setStep] = useState(1);
	// const [redirectOpen, setRedirectOpen] = useState(false);
	const [response, setResponse] = useState(null);
	// const [startTime] = useState(Date.now());
	// const [timeout] = useState(Date.now() + 60);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	// console.log({ response });

	const onSubmit = (data) => {
		// console.log({ data });
		setGenerating(true);
		profileAxios
			.post("/transactions/generate-virtual-account", {
				bvn: data.bvn,
				dateOfBirth: data.dob,
				address: data.address,
				gender: data.gender,
				phoneNumber: data.phone,
			})
			.then((res) => {
				// console.log(res);
				setStep(2);
				setResponse(res);
			})
			.catch((err) => {
				console.log(err);
				if (err.code === "ECONNABORTED") {
					// Handle timeout error
					toast.error("The request timed out. Please try again.");
				} else if (err.response.status === 400) {
					toast.error("Account Already Exists!");
				} else {
					toast.error(err.response.data.message);
				}
			})
			.finally(() => setGenerating(false));
	};

	const handleRedirect = () => {
		// setRedirectOpen(true);
		window.open(response?.data?.consentUrl);
		setStep(3);
	};

	// useEffect(() => {
	// 	const checkTimeout = () => {
	// 		if (Date.now() - startTime >= timeout) {
	// 			setRedirectOpen(false);
	// 		}
	// 	};
	// 	const timerId = setInterval(checkTimeout, 5000);
	// 	return () => clearInterval(timerId);
	// }, [startTime, timeout]);

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			{generating && <Overlay message="Generating Account" />}
			<div className="px-4 pb-8">
				<p className="text-primary text-2xl font-bold mb-2">
					Generate Virtual Account
				</p>

				{step === 1 && (
					<form
						className="grid grid-cols-1 gap-2"
						style={{ maxWidth: 500, width: "100%" }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div>
							<BaseInput
								label={`Enter ${
									user.userType === "pro" ? "" : "Director's"
								} BVN`}
								{...register("bvn", {
									required: "This field is required",
								})}
								type="number"
								error={errors.bvn}
								errorText={errors.bvn && errors.bvn.message}
							/>
						</div>
						<div>
							<BaseInput
								label={`Enter ${
									user.userType === "pro" ? "" : "Director's"
								} Date of Birth`}
								{...register("dob", {
									required: "This field is required",
								})}
								type="date"
								max={new Date().toISOString().split("T")[0]}
								error={errors.dob}
								errorText={errors.dob && errors.dob.message}
							/>
						</div>
						<div>
							<BaseInput
								label={`Enter ${
									user.userType === "pro" ? "" : "Director's"
								} Address`}
								{...register("address", {
									required: "This field is required",
								})}
								error={errors.address}
								errorText={errors.address && errors.address.message}
							/>
						</div>
						<div>
							<BaseInput
								label={`Enter ${
									user.userType === "pro" ? "" : "Director's"
								} Phone Number`}
								{...register("phone", {
									required: "This field is required",
								})}
								error={errors.phone}
								errorText={errors.phone && errors.phone.message}
							/>
						</div>
						<div>
							<BaseSelect
								label={`Enter ${
									user.userType === "pro" ? "" : "Director's"
								} Gender`}
								{...register("gender", {
									required: "This field is required",
								})}
								error={errors.gender}
								errorText={errors.gender && errors.gender.message}
							>
								<option></option>
								<option>Male</option>
								<option>Female</option>
							</BaseSelect>
						</div>
						<div className="flex gap-4 items-center mt-4">
							<div className="flex-1">
								<SquareButton
									type="button"
									variant="danger"
									onClick={handleClose}
								>
									Cancel
								</SquareButton>
							</div>
							<div className="flex-1">
								<SquareButton type="submit">Submit</SquareButton>
							</div>
						</div>
					</form>
				)}
				{step === 2 && (
					<div>
						<p className="text-xs text-gray-600 mb-2 cursor-pointer">
							Click the link below and finalize your verification process
						</p>
						<div
							className="p-4 rounded-md bg-adminPrimary/20"
							onClick={handleRedirect}
						>
							<p className="text-adminPrimary text-tiny font-bold hover:underline">
								{response?.data?.consentUrl}
							</p>
						</div>
					</div>
				)}
				{step === 3 && (
					<SuccessInfo message="Please finish consenting your BVN so that your account number can be activated" />
				)}
			</div>
		</Modal>
	);
}

GenerateVirtualAccounts.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	refetch: PropTypes.func,
};
