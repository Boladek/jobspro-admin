import React from "react";
import { UseAuth } from "../../../../context/auth-context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import kycAxios from "../../../../helpers/kycAxios";
import { BaseInput } from "../../../../component/input";
import { SquareButton } from "../../../../component/square-button";
import { func } from "prop-types";
import { Overlay } from "../../../../component/overlay-component";

export function BvnSubmission({ gotoNextPage, handleBVN, goBack }) {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		setLoading(true);
		kycAxios
			.post("/kyc/verify-bvn", {
				bvn: data.bvn,
			})
			.then((res) => {
				// console.log(res);
				toast.success(res.message);
				handleBVN(data.bvn);
				gotoNextPage();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<form className="max-w-[400px] w-full" onSubmit={handleSubmit(onSubmit)}>
			{loading && <Overlay message="Verifying BVN" />}
			<div className="flex justify-end">
				<span
					onClick={goBack}
					className="hover:underline text-gray-500 text-sm capitalize cursor-pointer"
				>
					back
				</span>
			</div>
			<p className={`text-primary font-bold mb-4`}>
				{user.userType === "business"
					? "Please enter Manager/Business Owner BVN"
					: "Please enter your BVN"}
			</p>
			<div className="mb-1">
				<BaseInput
					label="Enter BVN"
					{...register("bvn", {
						required: "This field is required",
						maxLength: {
							value: 11,
							message: "BVN must be exactly 11 characters",
						},
						minLength: {
							value: 11,
							message: "BVN must be exactly 11 characters",
						},
					})}
					maxLength="11"
					minLength="11"
					error={errors.bvn}
					errorText={errors.bvn && errors.bvn.message}
				/>
			</div>
			<p
				className="text-primary text-xs mb-16 hover:underline cursor-default"
				onClick={() => setOpen(true)}
			>
				I can’t remember my BVN?
			</p>
			<div>
				<SquareButton type="submit">Submit</SquareButton>
			</div>

			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-gray-400/30 flex justify-end"
					style={{
						zIndex: 10000,
					}}
				>
					<div className="bg-white p-2 w-full max-w-lg flex flex-col">
						<div className="flex justify-end">
							<span
								className="p-2 cursor-pointer hover:scale-110 text-2xl text-red-500"
								onClick={() => setOpen(false)}
							>
								&times;
							</span>
						</div>
						<div className="p-2 flex-1 min-h-96 overflow-y-auto content-center">
							<div className="mx-auto w-fit max-w-sm">
								<div className="text-center mb-8">
									<p>Dial</p>
									<p className="text-primary text-4xl font-bold">*565*0#</p>
								</div>
								<div className="text-center p-4 rounded-lg bg-light shadow-sm">
									<p className="text-primary">
										You can check your BVN by simply dialing the
										code *565*0# using the phone number you used to register
										your BVN. By following the prompts displayed after you dial
										the code, your BVN will be displayed on your mobile device
										for a service fee of N20. The method is fast and doesn’t
										require any internet connection. 
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	);
}

BvnSubmission.propTypes = {
	gotoNextPage: func,
	handleBVN: func,
	goBack: func,
};
