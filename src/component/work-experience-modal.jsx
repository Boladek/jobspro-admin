import { useState } from "react";
import { Modal } from "./modal";
import { BaseButton } from "./button";
import work from "../assets/work-experience.png";
import { useForm } from "react-hook-form";
import { BaseInput } from "./input";
import { BaseTextArea } from "./text-area";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import upload from "../assets/upload-icon.png";
import close from "../assets/close-circle.png";
import profileAxios from "../helpers/profileAxios";
import { BaseSelect } from "./select";
import { toast } from "react-toastify";
import { Overlay } from "./overlay-component";

export function WorkExperienceModal({ open, handleClose, form = {} }) {
	const [remember, setRemember] = useState(false);
	const [loading, setLoading] = useState(false);
	const [files, setFiles] = useState([]);
	const [previews, setPreviews] = useState([]);

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();
	const watchCountry = watch("country", "");
	const watchState = watch("state", "");

	const handleFile = (e) => {
		// if (!checkFile(e)) return;
		const reader = new FileReader();
		reader.onload = () => {
			setPreviews((prev) => [...prev, reader.result]);
		};
		reader.readAsDataURL(e.target.files[0]);
		setFiles((prev) => [...prev, e.target.files[0]]);
	};

	const filterPreviews = (preview, index) => {
		setPreviews((prev) => prev.filter((item) => item !== preview));
		setFiles((prev) => prev.filter((item, pos) => index !== pos));
	};

	const { data: countries = [] } = useQuery({
		queryKey: ["countries"],
		queryFn: () => profileAxios.get("/location/countries"),
		select: (data) => data.data,
		staleTime: Infinity,
	});

	const { data: states = [] } = useQuery({
		queryKey: [`states-${watchCountry}`, watchCountry],
		queryFn: () => profileAxios.get(`/location/states/${watchCountry}`),
		select: (data) => data.data,
		enabled: !!watchCountry,
		staleTime: Infinity,
	});

	const { data: cities = [] } = useQuery({
		queryKey: [`states-${watchState}`, watchState],
		queryFn: () => profileAxios.get(`/location/cities/${watchState}`),
		select: (data) => data.data,
		enabled: !!watchState,
		staleTime: Infinity,
	});

	const onSubmit = (data) => {
		setLoading(true);
		const fd = new FormData();

		fd.append("role", data.title);
		fd.append("description", data.description);
		fd.append("cityId", data.city);
		fd.append("countryId", data.country);
		fd.append("startDate", data.startDate);
		fd.append("endDate", data.endDate);
		fd.append("workplace", data.location);
		files.forEach((item) => {
			fd.append("files", item);
		});

		profileAxios
			.post("/profile/user-experience", fd, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
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
			{loading && <Overlay message="Updating work history" />}
			<form className="w-full p-2" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col items-center gap-2 mb-4 w-2/3 my-0 mx-auto">
					<div className="hidden md:block">
						<img src={work} alt="Illustration" height="50" className="h-24" />
					</div>
					<p className={`font-bold text-primary text-2xl`}>
						Add work Experience
					</p>
				</div>
				<div className="block gap-4 mb-4 md:flex">
					<div className="w-full md:w-1/2">
						<div className="mb-2">
							<BaseInput
								label="Title"
								{...register("title", {
									required: "This field is required",
								})}
								error={errors.title}
								errorText={errors.title && errors.title.message}
								defaultValue={form.title}
							/>
						</div>
						<div className="mb-2">
							<BaseInput
								label="Place of work"
								{...register("location", {
									required: "This field is required",
								})}
								error={errors.location}
								errorText={errors.location && errors.location.message}
								defaultValue={form.placeOfWork}
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
						<div className="mb-2">
							<BaseSelect
								label="State"
								{...register("state", {
									required: "This field is required",
								})}
								error={errors.state}
								errorText={errors.state && errors.state.message}
							>
								<option></option>
								{states.map((item) => (
									<option key={item.uuid} value={item.id}>
										{item.name}
									</option>
								))}
							</BaseSelect>
						</div>
						<div className="mb-2">
							<BaseSelect
								label="City"
								{...register("city", {
									required: "This field is required",
								})}
								error={errors.city}
								errorText={errors.city && errors.city.message}
							>
								<option></option>
								{cities.map((item) => (
									<option key={item.uuid} value={item.id}>
										{item.name}
									</option>
								))}
							</BaseSelect>
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<div className="flex gap-2 mb-2">
							<input
								value={remember}
								onChange={(e) => setRemember(e.target.checked)}
								type="checkbox"
								className="form-checkbox h-4 w-4 text-indigo-600 border-indigo-600 rounded"
							/>
							<label className="text-xs">
								I’m currently working in this position
							</label>
						</div>
						<div className="flex gap-2">
							<div className="mb-2">
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
							<div className="mb-2">
								<BaseInput
									label="End Date"
									disabled={remember}
									type="date"
									{...register("endDate", {
										required: !remember && "This field is required",
									})}
									error={errors.endDate}
									errorText={errors.endDate && errors.endDate.message}
								/>
							</div>
						</div>
						<div className="mb-2">
							<BaseTextArea label="Description" {...register("description")} />
						</div>
						<div className="flex gap-2 flex-wrap">
							<label
								className="block border rounded-xl p-2 mb-1 w-1/4"
								id="file-upload"
							>
								<div className="w-full text-center">
									<div className="flex justify-center">
										<img src={upload} className="h-8" />
									</div>
									<p className="text-xs text-gray-500 underline">
										Upload your file
									</p>
								</div>
								<input
									id="photo-upload"
									type="file"
									className="hidden relative z-1"
									onChange={handleFile}
									accept="image/*"
								/>
							</label>
							{/* <label
								id="files-upload"
								className="block border rounded-md p-2 text-center w-1/4"
							>
								<img src={upload} className="h-8" />
								<p className="text-xs text-gray-500 underline">Upload Work</p>
								<input
									id="files-upload"
									type="file"
									className="opacity-0 absolute z-1"
									onChange={handleFile}
									// onClick={handleDivClick}
									accept="image/*"
								/>
							</label> */}
							{previews.map((item, index) => (
								<div
									className="relative h-20 w-1/4 overflow-hidden border rounded-xl bg-gray-900"
									key={item}
									style={{
										backgroundImage: `url(${item})`,
										backgroundSize: "cover", // Optional: adjust according to your needs
										backgroundPosition: "center", // Optional: adjust according to your needs
									}}
								>
									<span
										className="material-symbols-outlined text-white absolute transform -translate-x-1/2 -translate-y-1/2 z-10 top-1/2 left-1/2 cursor-pointer"
										// onClick={() => setFile(null)}
										onClick={() => filterPreviews(item, index)}
									>
										cancel
									</span>

									<img src={item} className="h-full w-full object-cover" />
									<div className="absolute inset-0 flex justify-center items-center">
										<img
											src={close}
											className="h-8"
											onClick={() => filterPreviews(item, index)}
										/>
									</div>
								</div>
							))}
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
						<BaseButton type="submit">Add</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

WorkExperienceModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
