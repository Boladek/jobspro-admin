/* eslint-disable no-irregular-whitespace */
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { BaseButton } from "../../../../component/button";
import { BaseInput } from "../../../../component/input";
import { useState } from "react";
import kycAxios from "../../../../helpers/kycAxios";
import { Overlay } from "../../../../component/overlay-component";
import { toast } from "react-toastify";
import { UseAuth } from "../../../../context/auth-context";

export function BusinessVerification({ gotoNextPage, goBack }) {
	const [loading, setLoading] = useState(false);
	const { name } = UseAuth();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		setLoading(true);
		kycAxios
			.post("/kyc/verify-cac", {
				rcNumber: data.rcNo,
				companyName: name,
			})
			.then((res) => {
				toast.success(res.message);
				gotoNextPage();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<form className="max-w-[400px] w-full" onSubmit={handleSubmit(onSubmit)}>
			{loading && <Overlay message="Verifying Company Details" />}
			<div className="flex justify-end">
				<span
					onClick={goBack}
					className="hover:underline text-gray-500 text-sm capitalize cursor-pointer"
				>
					back
				</span>
			</div>
			<p className={`text-primary font-bold mb-2`}>Business Verification</p>
			<p className="text-xs font-extralight mb-4">
				Is your business registered in Nigeria?
			</p>
			<div className="mb-2">
				<BaseInput
					label="Enter Business Registration Number"
					{...register("rcNo", {
						required: "This field is required",
					})}
					error={errors.rcNo}
					errorText={errors.rcNo && errors.rcNo.message}
				/>
			</div>
			<div className="mb-8">
				<BaseInput
					label="Enter Company Name"
					// {...register("companyName", {
					// 	required: "This field is required",
					// })}
					value={name}
					// error={errors.companyName}
					// errorText={errors.companyName && errors.companyName.message}
				/>
			</div>

			<div>
				<BaseButton type="submit">Submit</BaseButton>
			</div>
		</form>
	);
}

BusinessVerification.propTypes = {
	gotoNextPage: PropTypes.func,
	goBack: PropTypes.func,
};
