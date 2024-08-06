import PropTypes from "prop-types";
import { BaseInput } from "../../../../../component/input";
import { useForm } from "react-hook-form";
import { BaseSelect } from "../../../../../component/select";
import { ProgressBar } from "../../../../../component/admin/progress-bar";

export function Salary({ goBack }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form
			className="grid grid-cols-1 gap-4 pt-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<div className="border p-3 px-6 rounded-md border-[#3514FF] w-fit">
					<p className="text-xs text-[#3514FF]">Salary</p>
					<div className="w-6">
						<ProgressBar color="#0FFF9A" />
					</div>
					<div>
						<span className="text-xs">NGN</span>{" "}
						<span className="text-lg text-[#3514FF] font-bold">400,000</span>
					</div>
				</div>
			</div>
			<div>
				<BaseInput
					label="Amount"
					{...register(`amount`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.amount}
					errorText={errors.amount && errors.amount.message}
				/>
			</div>
			<div className="flex gap-4 items-start justify-end pt-4">
				<button
					className="p-3 px-8 rounded-md text-xs text-[#3514FF] bg-[#F0F5FF] font-bold cursor-pointer hover:opacity-80"
					onClick={goBack}
					type="button"
				>
					Back
				</button>
				<button
					className="p-3 px-8 rounded-md text-xs text-[#3514FF] bg-[#F0F5FF] font-bold cursor-pointer hover:opacity-80"
					type="submit"
				>
					Update
				</button>
			</div>
		</form>
	);
}

Salary.propTypes = {
	goBack: PropTypes.func,
};
