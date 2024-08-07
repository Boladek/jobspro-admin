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
import { UseAuth } from "../context/auth-context";
import { isEmpty } from "../helpers/function";

export function EducationExperienceModal({ open, handleClose, form = {} }) {
	const { refetch } = UseAuth();
	const [loading, setLoading] = useState(false);
	const [remember, setRemember] = useState(false);
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
		if (!isEmpty(form)) {
			profileAxios
				.patch(`/profile/education-history/${form.id}`, {
					degree: data.degree,
					description: data.description,
					higherInstitution: data.institution,
					countryId: Number(data.country),
					startDate: data.startDate,
					endDate: data.endDate,
					discipline: data.discipline,
					isStillStudying: remember,
				})
				.then((res) => {
					toast.success(res.message);
					refetch();
					handleClose();
				})
				.catch((err) => toast.error(err.response.data.message))
				.finally(() => setLoading(false));
		} else {
			profileAxios
				.post("/profile/education-history", {
					degree: data.degree,
					description: data.description,
					higherInstitution: data.institution,
					countryId: Number(data.country),
					startDate: data.startDate,
					endDate: data.endDate,
					discipline: data.discipline,
					isStillStudying: false,
				})
				.then((res) => {
					toast.success(res.message);
					refetch();
					handleClose();
				})
				.catch((err) => toast.error(err.response.data.message))
				.finally(() => setLoading(false));
		}
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={600}>
			{loading && <Overlay message="Updating Educational History" />}
			<form
				className="w-full p-4 grid grid-cols-1 gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col items-center justify-center">
					<img src={education} alt="Illustration" className="h-20" />
					<p className={`font-bold text-primary text-xl`}>
						Add Education Experience
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="">
						<BaseInput
							label="Institution"
							{...register("institution", {
								required: "This field is required",
							})}
							error={errors.institution}
							errorText={errors.institution && errors.institution.message}
							defaultValue={form.higherInstitution}
						/>
					</div>
					<div className="">
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
					<div className="">
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
					<div className="">
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
					<div className="sm:col-span-2">
						<div className="flex gap-2">
							<input
								value={remember}
								onChange={(e) => setRemember(e.target.checked)}
								defaultChecked={form?.isStillStudying}
								type="checkbox"
								className="form-checkbox h-4 w-4 text-indigo-600 border-indigo-600 rounded"
							/>
							<label className="text-sm">I’m still studying</label>
						</div>
					</div>
					<div className="">
						<BaseInput
							label="Start Date"
							defaultValue={form.startDate}
							type="date"
							{...register("startDate", {
								required: "This field is required",
							})}
							error={errors.startDate}
							errorText={errors.startDate && errors.startDate.message}
						/>
					</div>
					<div className="">
						<BaseInput
							label="End Date"
							disabled={remember}
							type="date"
							{...register("endDate", {
								required: !remember && "This field is required",
							})}
							defaultValue={form?.endDate}
							error={errors.endDate}
							errorText={errors.endDate && errors.endDate.message}
						/>
					</div>
					<div className="sm:col-span-2">
						<BaseTextArea
							label="Description"
							{...register("description")}
							defaultValue={form?.description}
						/>
					</div>
				</div>
				<div className="flex justify-center gap-2">
					<div className="w-1/2">
						<BaseButton variant="sec" type="button" onClick={handleClose}>
							Cancel
						</BaseButton>
					</div>
					<div className="w-1/2">
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
