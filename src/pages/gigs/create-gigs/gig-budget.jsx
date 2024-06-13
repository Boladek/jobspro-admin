import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { BaseButton } from "../../../component/button";
import { BaseInput } from "../../../component/input";
import { BaseSelect } from "../../../component/select";
import { formatNumber } from "../../../helpers/function";
import profileAxios from "../../../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Overlay } from "../../../component/overlay-component";

const tiers = [
	{
		value: "tier0",
		label: "Tier 0",
	},
	{
		value: "tier1",
		label: "Tier 1",
	},
	{
		value: "tier2",
		label: "Tier 2",
	},
	{
		value: "tier3",
		label: "Tier 3",
	},
	{
		value: "tier4",
		label: "Tier 4",
	},
	{
		value: "tier5",
		label: "Tier 5",
	},
];

const ratings = [
	{
		label: "One Stars",
		value: "1 star",
	},
	{
		label: "Two Stars",
		value: "2 stars",
	},
	{
		label: "Three Stars",
		value: "3 stars",
	},
	{
		label: "Four Stars",
		value: "4 stars",
	},
	{
		label: "Five Stars",
		value: "5 stars",
	},
];

export function GigBudget({ handleForm, gotoNextStep }) {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
		control,
	} = useForm({
		defaultValues: {
			tiers: [],
			ratings: [],
		},
	});
	const watchCountry = watch("country", "");
	const watchState = watch("state", "");
	const watchCity = watch("city", "");
	const watchSubCategoryId = watch("subCategory", "");
	const watchPros = watch("numberOfPros", "");
	const watchRatings = watch("ratings");
	const watchTiers = watch("tiers");
	const watchBudget = watch("budget", "");
	const watchTip = watch("tip", "");

	console.log({ watchCity });

	const [allIndustries, setAllIndustries] = useState([]);
	const [allSubIndustries, setAllSubIndustries] = useState([]);

	const { data: calculation = {}, isLoading: calculatingBudget } = useQuery({
		queryKey: [
			`calculateBudget-${watchCity}-${watchSubCategoryId}-${watchTiers.length}-${watchRatings.length}-${watchPros}`,
			watchCity,
			watchSubCategoryId,
			watchRatings,
			watchTiers,
			watchPros,
		],
		queryFn: () => {
			return profileAxios.post("/gigs/calculate-budget", {
				subCategoryId: Number(watchSubCategoryId || 0),
				cityId: Number(watchCity || 0),
				numberOfPros: Number(watchPros || 0),
				tiers: watchTiers,
				proRatings: watchRatings,
			});
		},
		select: (data) => data.data,
		staleTime: Infinity,
		retry: 2,
		enabled:
			!!watchSubCategoryId &&
			!!watchCity &&
			watchTiers.length > 0 &&
			watchRatings.length > 0 &&
			!!watchPros,
	});

	console.log({ watchSubCategoryId });

	const { data: industries = [], isLoading: gettingIndustries } = useQuery({
		queryKey: ["indutries"],
		queryFn: () => profileAxios.get("/industry/category"),
		select: (data) => data.data,
		staleTime: Infinity,
		retry: 1,
	});

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
		queryKey: [`cities-${watchState}`, watchState],
		queryFn: () => profileAxios.get(`/location/cities/${watchState}`),
		select: (data) => data.data,
		enabled: !!watchState,
		staleTime: Infinity,
	});

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

	const onSubmit = (data) => {
		const formData = {
			subCategoryId: Number(data.subCategory),
			cityId: Number(data.city),
			numberOfPros: Number(data.numberOfPros),
			tiers: data.tiers,
			proRatings: data.ratings,
			budget: Number(data.budget),
			tips: Number(data.tip),
		};
		handleForm(formData);
		gotoNextStep();
	};

	const subIndustries = useMemo(() => {
		if (!allIndustries || allIndustries.length === 0) return [];
		return allIndustries.map((item) => item.subCategories);
	}, [allIndustries]);

	useEffect(() => {
		setAllSubIndustries(subIndustries.flat());
	}, [subIndustries]);

	return (
		<form
			className="max-w-screen-lg mx-auto m-2 bg-white rounded-md h-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			{calculatingBudget && <Overlay />}
			<div className="block md:flex gap-8">
				<div className="w-full md:w-1/2">
					<div className="mb-2">
						<BaseSelect label="Select Industry" onChange={handleChange}>
							<option></option>
							{industries.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
						{gettingIndustries && <div className="progress"></div>}
					</div>
					<div className="mb-2">
						<BaseSelect
							label="Select Sub Category"
							{...register("subCategory", {
								required: "This field is required",
							})}
							error={errors.subCategory}
							errorText={errors.subCategory && errors.subCategory.message}
						>
							<option></option>
							{allSubIndustries?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="mb-2">
						<BaseSelect
							label="Gig Location Country"
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
							label="Gig Location State"
							{...register("state", {
								required: "This field is required",
							})}
							error={errors.state}
							errorText={errors.state && errors.state.message}
						>
							<option></option>
							{states?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="mb-2">
						<BaseSelect
							label="Gig Location City"
							{...register("city", {
								required: "This field is required",
							})}
							error={errors.city}
							errorText={errors.city && errors.city.message}
						>
							<option></option>
							{cities?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</BaseSelect>
					</div>
					<div className="mb-2">
						<BaseInput
							label="No of pros needed"
							type="number"
							{...register("numberOfPros", {
								required: "This field is required",
							})}
							error={errors.numberOfPros}
							errorText={errors.numberOfPros && errors.numberOfPros.message}
						/>
					</div>
					<div className="mb-4">
						<p className="text-sm mb-2">Select Pro Tier(s)</p>
						<CheckboxGroup name="tiers" control={control} options={tiers} />
					</div>
					<div className="mb-2">
						<p className="text-sm mb-2">Select Pro Rating(s)</p>
						<CheckboxGroup name="ratings" control={control} options={ratings} />
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<div className="px-4 py-6 border rounded-lg mt-4">
						<p className="font-bold text-2xl">Budget Summary</p>
						<p className="text-sm text-gray-500">
							Based on Category, City, Duration, Tier Level & Pro rating
							Suggested Price Range is{" "}
						</p>
						<p className="text-primary text-xl font-bold">
							N{formatNumber(calculation?.minBudget || 0, 2)} -{" "}
							{formatNumber(calculation?.maxBudget || 0, 2)}
						</p>
						<div className="mb-2">
							<BaseInput
								label="Budget"
								type="number"
								{...register("budget", {
									required: "This field is required",
								})}
								min={0}
								error={errors.budget}
								errorText={errors.budget && errors.budget.message}
							/>
						</div>
						<div className="mb-2">
							<BaseInput
								label="Addition Tip (Optional)"
								type="number"
								{...register("tip")}
								min={0}
							/>
							<p className="text-xs text-gray-400">
								Based on your discretion and Pros performance beyond minimum
								expectations
							</p>
						</div>
						<div>
							<p>Total Budget</p>
							<p className="text-xl text-primary font-bold">
								N
								{formatNumber(
									Number(watchBudget || 0) + Number(watchTip || 0),
									2
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-4 max-w-sm mx-auto mt-6">
				<div className="w-1/2">
					<BaseButton variant="sec">Previous</BaseButton>
				</div>
				<div className="w-1/2">
					<BaseButton>Next</BaseButton>
				</div>
			</div>
		</form>
	);
}

GigBudget.propTypes = {
	handleForm: PropTypes.func.isRequired,
	gotoNextStep: PropTypes.func.isRequired, // Proper usage of PropTypes
};

CheckboxGroup.propTypes = {
	options: PropTypes.array,
	name: PropTypes.string,
	control: PropTypes.node,
};

function CheckboxGroup({ options, name, control }) {
	return (
		<div className="flex gap-3 flex-wrap">
			{options.map((option) => (
				<label
					key={option.value}
					className="flex gap-2 items-center text-sm cursor-pointer w-fit select-none"
				>
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<input
								type="checkbox"
								value={option.value}
								checked={field.value.includes(option.value)}
								onChange={(e) => {
									if (e.target.checked) {
										field.onChange([...field.value, option.value]);
									} else {
										field.onChange(
											field.value.filter((val) => val !== option.value)
										);
									}
								}}
							/>
						)}
					/>
					{option.label}
				</label>
			))}
		</div>
	);
}
