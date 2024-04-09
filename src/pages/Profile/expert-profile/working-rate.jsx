import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";

export function WorkingRate() {
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
				<div style={{ maxWidth: 500, width: "100%" }}>
					<p className={`text-[${colors.primary}] text-3xl font-bold`}>
						Working rate
					</p>
					<p className="text-sm text-gray-500 mb-4">
						More information should be placed here
					</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="border rounded-md p-6 mb-4"
					>
						<div className="flex gap-3 w-3/5 mb-4">
							{["hourly", "daily"].map((item) => (
								<div
									key={item}
									// onClick={() => handleNavigate(item)}
									className={`capitalize p-2 flex-1 border-2 border-[#206DB0] text-[${colors.primary}] rounded-full text-center hover:bg-[#206DB0] hover:text-white cursor-pointer font-bold`}
								>
									{item}
								</div>
							))}
						</div>
						<div className="mb-2">
							<BaseInput
								label="Hourly Rate"
								{...register("rate", {
									required: "This field is required",
								})}
								error={errors.rate}
								errorText={errors.rate && errors.rate.message}
							/>
						</div>
					</form>
					<div>
						<div className="mb-2">
							<p className="text-xs">Service Fee(10%)</p>
							<p className="font-bold text-2xl">NGN 200</p>
						</div>
						<hr />
						<div className="my-2">
							<p className="text-xs">Amount you will recieve</p>
							<p className="font-bold text-2xl">NGN 1800 /Daily</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec">
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button">Next</BaseButton>
				</div>
			</div>
		</div>
	);
}

WorkingRate.propTypes = {
	gotoNext: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
