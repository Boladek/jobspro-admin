import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { BaseTextArea } from "../../../component/text-area";

const tabs = ["yes", "no"];

export function GigInformationModal({
	open,
	handleClose,
	form = {},
	handleForm,
	handleTemplate,
}) {
	const [selected, setSelected] = useState("");

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();
	const watchTitle = watch("title", "");
	const watchInstruction = watch("additionalInstructions", "");

	const onSubmit = (data) => {
		const formData = {
			title: data.title,
			description: data.description,
			isExperienced: selected === "yes",
			dressCode: data.dressCode,
			additionalInstruction: data.additionalInstructions,
			isSaved: data.saveTemplate,
		};
		handleForm(formData);
		handleTemplate(formData);
		handleClose();
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={750}>
			<form
				className="w-full p-2"
				onSubmit={handleSubmit(onSubmit)}
				style={{ maxHeight: "90vh" }}
			>
				<div className="block gap-4 mb-4 ">
					<div className="w-full md:flex gap-4">
						<div className="mb-2 flex-1">
							<BaseTextArea
								label="Gig Title"
								placeholder="This is what the pro would see when they are applying"
								{...register("title", {
									required: "This field is required",
								})}
								error={errors.title}
								errorText={errors.title && errors.title.message}
								defaultValue={form?.title}
								maxLength="50"
							/>
							<p className="text-xs">
								You have a{" "}
								<span className="text-xs text-primary">
									{50 - watchTitle.length} Character
								</span>{" "}
								limit, Please try to make it as concise as possible.{" "}
							</p>
						</div>
						<div className="mb-2 flex-1">
							<BaseTextArea
								placeholder="write here"
								label="Gig Description"
								{...register("description")}
							/>
						</div>
					</div>
					{/* <div className="w-full"></div> */}
					<div className="w-full md:flex gap-4">
						<div className="mb-2 flex-1">
							<BaseTextArea
								placeholder="write here"
								label="Dress Code"
								{...register("dressCode")}
							/>
						</div>
						<div className="mb-2 flex-1">
							<BaseTextArea
								placeholder="write here"
								label="Additional Instructions"
								{...register("additionalInstructions")}
								maxLength="1500"
							/>
							<p className="text-xs">
								{watchInstruction.length}/1500 Characters
							</p>
						</div>
					</div>
					<div className="mb-2">
						<p className="font-bold capitalize mb-2">Is experience required?</p>
						<div className="flex gap-3">
							{tabs.map((item) => (
								<label
									key={item}
									htmlFor={item}
									className={`capitalize py-2 px-6 border-2 border-secondary text-xs text-primary rounded-full text-center hover:bg-secondary hover:text-white cursor-pointer font-bold w-fit ${
										item === selected ? "bg-primary text-white" : ""
									}`}
								>
									<input
										id={item}
										value={item}
										type="radio"
										// required
										{...register("requiredExperience", {
											required: "Please select one option",
										})}
										// name="requiredExperience"
										onChange={(e) => setSelected(e.target.value)}
										className="hidden"
									/>
									{item}
								</label>
							))}
						</div>
						{errors.requiredExperience && (
							<p className="text-red-500 text-xs mt-1">
								{errors.requiredExperience.message}
							</p>
						)}
					</div>
				</div>
				<div className="mb-2">
					<p className="font-bold">Save this as template?</p>
					<div className="flex gap-1 items-center select-none border-0 shadow-sm">
						<input
							type="checkbox"
							{...register("saveTemplate")}
							id="save"
							className="h-4 w-4"
						/>
						<label htmlFor="save" className="text-sm font-light">
							Yes
						</label>
					</div>
				</div>
				<hr />
				<div className="flex justify-center gap-2 mt-4">
					<div className="w-1/4">
						<BaseButton variant="sec" type="button" onClick={handleClose}>
							Cancel
						</BaseButton>
					</div>
					<div className="w-1/4">
						<BaseButton type="submit">Save</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

GigInformationModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	handleForm: PropTypes.func,
	handleTemplate: PropTypes.func,
};
