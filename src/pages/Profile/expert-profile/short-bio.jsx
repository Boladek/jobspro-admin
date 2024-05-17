import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { BaseButton } from "../../../component/button";
import { BaseTextArea } from "../../../component/text-area";

export function ShortBio({ gotoNextStep, gotoPrevious }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onSubmit = (data) => {
		console.log({ data });
		gotoNextStep();
	};

	return (
		<form
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div className="w-full">
					<p className={`text-primary text-3xl font-bold`}>Short Bio</p>
					<p className="text-sm text-gray-500 mb-4">
						More information should be placed here
					</p>
					<div className="border rounded-md p-6 mb-4">
						<div className="mb-2">
							<BaseTextArea
								label="Description"
								{...register("description", {
									// required: "This field is required",
								})}
								height={10}
								placeholder="I am most senior dance guru"
								error={errors.description}
								errorText={errors.description && errors.description.message}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec" onClick={gotoPrevious}>
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="submit">Next</BaseButton>
				</div>
			</div>
		</form>
	);
}

ShortBio.propTypes = {
	gotoNextStep: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
