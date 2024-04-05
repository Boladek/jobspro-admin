import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";

export function PhoneNumber() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		console.log({ data });
	};

	return (
		<div
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
		>
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div>
					<p className={`text-[${colors.primary}] text-3xl font-bold`}>
						Phone Number
					</p>
					<p className="text-sm text-gray-500 mb-4">
						We need to get a sense of your education, experience and skills.
						It’s quickest to import your information
					</p>
					<div className="border rounded-md p-6 mb-4">
						<div className="mb-2">
							<BaseInput
								label="Country Code"
								{...register("code", {
									required: "This field is required",
								})}
								placeholder="+234"
								error={errors.code}
								errorText={errors.code && errors.code.message}
							/>
						</div>
						<div className="mb-2">
							<BaseInput
								label="Phone Number"
								{...register("phoneNumber", {
									required: "This field is required",
								})}
								error={errors.phoneNumber}
								errorText={errors.phoneNumber && errors.description.message}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec">Previous</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button">Next</BaseButton>
				</div>
			</div>
		</div>
	);
}

PhoneNumber.propTypes = {
	gotoNext: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
