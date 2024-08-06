import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { BaseSelect } from "../../../../../component/select";
import { ProgressBar } from "../../../../../component/admin/progress-bar";

export function Department({ goBack }) {
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
			<div className="bg-[#1A68FF] p-4 rounded-md">
				<div className="w-fit p-1 px-6 bg-[#FFDE16] text-[#025949] text-xs rounded-md font-bold mb-6">
					Jobs Pro Finance
				</div>
				<div className="flex gap-4">
					<div className="text-white text-xs w-1/3">
						<p className="font-extralight">Current Department</p>
						<div className="w-6">
							<ProgressBar color="#0FFF9A" thickness={0.25} />
						</div>
						<p className="font-bold">Finance</p>
					</div>
					<div className="text-white text-xs w-1/3">
						<p className="font-extralight">Current Role</p>
						<div className="w-6">
							<ProgressBar color="#0FFF9A" thickness={0.25} />
						</div>
						<p className="font-bold">Finance Head</p>
					</div>
					<div className="text-white text-xs w-1/3">
						<p className="font-extralight">Duration Spent</p>
						<div className="w-6">
							<ProgressBar color="#0FFF9A" thickness={0.25} />
						</div>
						<p className="font-bold">4 Months</p>
					</div>
				</div>
			</div>
			<div>
				<BaseSelect
					label="Department"
					{...register(`department`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.department}
					errorText={errors.department && errors.department.message}
				>
					<option></option>
				</BaseSelect>
			</div>
			<div>
				<BaseSelect
					label="Role"
					{...register(`role`, {
						required: "This field is required",
						setValueAs: (v) => v.trim(),
					})}
					error={errors.role}
					errorText={errors.role && errors.role.message}
				>
					<option></option>
				</BaseSelect>
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

Department.propTypes = {
	goBack: PropTypes.func,
};
