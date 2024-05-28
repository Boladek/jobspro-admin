// import { useState } from "react";
import { Modal } from "./modal";
import { BaseButton } from "./button";
import education from "../assets/education-experience.png";
import { BaseInput } from "./input";
import { BaseTextArea } from "./text-area";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../helpers/profileAxios";
import { toast } from "react-toastify";
import { useState } from "react";
import { BaseSelect } from "./select";
import { Overlay } from "./overlay-component";

export function EducationExperienceModal({ open, handleClose, form = {} }) {
	const [loading, setLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const { data: countries = [] } = useQuery({
		queryKey: ["countries"],
		queryFn: () => profileAxios.get("/location/countries"),
		select: (data) => data.data,
		staleTime: Infinity,
	});

	const onSubmit = (data) => {
		setLoading(true);
		profileAxios
			.post("/profile/education-history", {
				// longitude: longitude,
				// latitude: latitude,
				degree: data.degree,
				description: data.description,
				// stateId: Number(data.state),
				higherInstitution: data.institution,
				countryId: Number(data.country),
				startDate: data.startDate,
				endDate: data.endDate,
				discipline: data.discipline,
				isStillStudying: false,
			})
			.then((res) => {
				toast.success(res.message);
				handleClose();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={750}>
			{loading && <Overlay message="Updating Educational History" />}
			<form className="w-full p-2" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
					<div className="hidden md:block">
						<img
							src={education}
							alt="Illustration"
							height="50"
							className="h-24"
						/>
					</div>
					<p className={`font-bold text-primary text-2xl`}>
						Add Education Experience
					</p>
				</div>
				<div className="block gap-4 mb-4 md:flex">
					<div className="w-full md:w-1/2">
						<div className="mb-2">
							<BaseInput
								label="Institution"
								{...register("institution", {
									required: "This field is required",
								})}
								error={errors.institution}
								errorText={errors.institution && errors.institution.message}
								defaultValue={form.institution}
							/>
						</div>
						<div className="mb-2">
							<BaseInput
								label="Degree"
								{...register("degree", {
									required: "This field is required",
								})}
								error={errors.degree}
								errorText={errors.degree && errors.degree.message}
								defaultValue={form.degree}
							/>
						</div>

						<div className="mb-2">
							<BaseInput
								label="Discipline"
								{...register("discipline", {
									required: "This field is required",
								})}
								error={errors.discipline}
								errorText={errors.discipline && errors.discipline.message}
								defaultValue={form.discipline}
							/>
						</div>
						<div className="mb-2">
							<BaseSelect
								label="Country"
								{...register("country", {
									required: "This field is required",
								})}
								error={errors.country}
								errorText={errors.country && errors.country.message}
							>
								<option></option>
								{countries.map((item) => (
									<option key={item.uuid} value={item.id}>
										{item.name}
									</option>
								))}
							</BaseSelect>
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<div className="flex gap-2">
							<div className="mb-2">
								<BaseInput
									label="Start Date"
									defaultValue={form.startDate}
									type="date"
								/>
							</div>
							<div className="mb-2">
								<BaseInput label="End Date" type="date" />
							</div>
						</div>
						<div className="mb-2">
							<BaseTextArea label="Description" />
						</div>
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

EducationExperienceModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
