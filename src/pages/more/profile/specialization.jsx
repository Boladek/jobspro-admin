import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Modal } from "../../../component/modal";
import { BaseButton } from "../../../component/button";
import { BaseSelect } from "../../../component/select";
import { Overlay } from "../../../component/overlay-component";
import profileAxios from "../../../helpers/profileAxios";
import { UseAuth } from "../../../context/auth-context";

export function Specialization({ open, handleClose }) {
	const { refetch } = UseAuth();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [allIndustries, setAllIndustries] = useState([]);
	const [allSubIndustries, setAllSubIndustries] = useState([]);
	const [allSubCategories, setAllSubCategories] = useState([]);

	const { data: industries = [], isLoading: gettingIndustries } = useQuery({
		queryKey: ["indutries"],
		queryFn: () => profileAxios.get("/industry"),
		select: (data) => data.data,
		staleTime: Infinity,
		retry: 1,
	});

	const onSubmit = () => {
		if (allIndustries.length < 1) {
			toast.error("Please select at least one Industry");
			return;
		}
		if (allSubCategories.length < 1) {
			toast.error("Please select at least one sub category");
			return;
		}
		setLoading(true);
		profileAxios
			.patch("/profile/industry", {
				subcategoryIds: allIndustries.map((sub) => String(sub.id)),
			})
			.then(() => {
				handleClose();
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
		// gotoNextStep(true);
	};

	const handleChange = (e) => {
		const { value } = e.target;
		if (!value) return;
		const industry = industries.find((item) => item.id === Number(value));
		setAllIndustries((prev) => {
			if (prev.length > 0) {
				const checkIfExists = prev.find((item) => item.id === Number(value));
				if (checkIfExists) return;
			}
			return [...prev, industry];
		});
	};

	const handleIndustry = (id) => {
		setAllIndustries((prev) => prev.filter((item) => item.id !== id));

		setAllSubCategories((prev) =>
			prev.filter((item) => item.industryId !== Number(id))
		);
	};

	const handleSubCategory = (id) => {
		setAllSubCategories((prev) => prev.filter((item) => item.id !== id));
	};

	const subIndustries = useMemo(() => {
		if (!allIndustries || allIndustries.length === 0) return [];
		return allIndustries.map((item) => item.subIndustries);
	}, [allIndustries]);

	useEffect(() => {
		setAllSubIndustries(subIndustries.flat());
	}, [subIndustries]);

	const handleSubChange = (e) => {
		const { value } = e.target;
		if (!value) return;
		const category = allSubIndustries.find((item) => item.id === Number(value));
		setAllSubCategories((prev) => {
			if (prev.length > 0) {
				const checkIfExists = prev.find((item) => item.id === Number(value));
				if (checkIfExists) return;
			}
			return [...prev, category];
		});
	};
	return (
		<Modal open={open} handleClose={handleClose} maxWidth={400}>
			<form
				className="py-4 h-full flex flex-col"
				style={{ maxWidth: 500, width: "100%" }}
				onSubmit={handleSubmit(onSubmit)}
			>
				{loading && <Overlay message="Updating Industry" />}
				<div className="flex-1 md:flex md:justify-center md:items-center">
					<div>
						<p className={`text-primary text-3xl font-bold`}>
							What your Industry of specialisation?
						</p>
						<p className="text-sm text-gray-500 mb-4">
							More information should be placed here
						</p>
						<div
							style={{ maxWidth: 500, width: "100%" }}
							className="border rounded-md p-6 mb-4"
						>
							<div className="mb-2">
								<BaseSelect
									label="Industry"
									{...register("industry", {
										required: "This field is required",
									})}
									onChange={handleChange}
									error={errors.industry}
									errorText={errors.industry && errors.industry.message}
								>
									<option></option>
									{industries.map((item) => (
										<option key={item.id} value={item.id}>
											{item.name}
										</option>
									))}
								</BaseSelect>
								{gettingIndustries && <div className="progress"></div>}
							</div>
							<div className="flex gap-2 flex-wrap">
								{allIndustries.map((text) => (
									<div
										key={text.id}
										className={`flex gap-2 py-1 px-2 border-2 border-primary text-primary text-xs rounded-full items-center font-bold`}
									>
										<span>{text.name}</span>
										<span
											onClick={() => handleIndustry(text.id)}
											className="material-symbols-outlined cursor-pointer"
										>
											&#x2716;
										</span>
									</div>
								))}
							</div>
						</div>
						{allIndustries.length > 0 && (
							<>
								<p className={`text-primary text-3xl font-bold`}>
									Sub category
								</p>
								<p className="text-sm text-gray-500 mb-4">
									Pick one service that best represents your work, so our
									algorithm can match you with the right clients.
								</p>
								<div
									style={{ maxWidth: 500, width: "100%" }}
									className="border rounded-md p-6 mb-4"
								>
									<div className="mb-2">
										<BaseSelect
											label="Services"
											{...register("services", {
												required: "This field is required",
											})}
											onChange={handleSubChange}
											error={errors.services}
											errorText={errors.services && errors.services.message}
										>
											<option></option>
											{allSubIndustries.map((item) => (
												<option key={item.id} value={item.id}>
													{item.name}
												</option>
											))}
										</BaseSelect>
									</div>
									<div className="flex gap-2 flex-wrap">
										{allSubCategories.map((text) => (
											<div
												key={text.id}
												className={`flex gap-2 py-1 px-2 border-2 border-primary text-primary text-xs rounded-full items-center font-bold`}
											>
												<span>{text.name}</span>
												<span
													onClick={() => handleSubCategory(text.id)}
													className="material-symbols-outlined cursor-pointer"
												>
													&#x2716;
												</span>
											</div>
										))}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<div className="flex justify-end gap-2">
					<div className="w-1/2">
						<BaseButton
							type="button"
							variant="sec"
							onClick={handleClose}
							loading={false}
						>
							Previous
						</BaseButton>
					</div>
					<div className="w-1/2">
						<BaseButton type="submit" loading={false}>
							Save
						</BaseButton>
					</div>
				</div>
			</form>
		</Modal>
	);
}

Specialization.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
