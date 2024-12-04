import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { UseCommission } from "../../../../context/commission-context";
import { BaseInput } from "../../../../component/input";
import { BaseSelect } from "../../../../component/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const countries = ["Nigeria", "USA", "Canada", "UAE", "Chad", "Congo"];

export function CreateCommission() {
	const { handleStep } = UseCommission();
	const [selectedCountries, setSelectedCountries] = useState([]);

	// const { data: countries = [] } = useQuery({
	// 	queryKey: ["countries"],
	// 	queryFn: () => profileAxios.get("/location/countries"),
	// 	select: (data) => data.data,
	// 	staleTime: Infinity,
	// });

	const handleCountrySelect = (e) => {
		const { value } = e.target;
		const newArray = [...selectedCountries, value];
		setSelectedCountries([...new Set(newArray)]);
	};

	return (
		<div>
			<div className="flex gap-2 items-center">
				<span onClick={() => handleStep(1)}>
					<FaArrowLeft className="text-xl" />
				</span>
				<span className="p-2 rounded-full text-xs bg-[#F1F2FF] text-[#3F0799]">
					Create Commission Category
				</span>
			</div>

			<form className="max-w-[400px] px-2 py-4 grid grid-cols-1 gap-4">
				<div>
					<BaseInput label="Category Name" />
				</div>
				<div className="p-1 px-3 rounded-md font-bold bg-gray-200 text-xs w-fit">
					Filters
				</div>
				<div>
					<BaseSelect label="Select Country" onChange={handleCountrySelect}>
						<option></option>
						{countries.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</BaseSelect>
					<div className="flex gap-2 items-center mt-2 flex-wrap">
						{selectedCountries.map((item) => (
							<div
								key={item}
								className="items-center py-1 px-3 rounded-full flex gap-2 border border-[#3F0799] text-[#3F0799] text-xs bg-[#E7E2FF]"
							>
								{item}
								<IoCloseCircleOutline
									className="text-lg"
									onClick={() =>
										setSelectedCountries((prev) =>
											prev.filter((val) => val !== item)
										)
									}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<BaseSelect label="Select Industry">
						<option></option>
						{countries.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</BaseSelect>
					<BaseSelect
						label="Select Sub-Category"
						onChange={handleCountrySelect}
					>
						<option></option>
						{countries.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</BaseSelect>
					<div className="flex gap-2 items-center mt-2 flex-wrap">
						{selectedCountries.map((item) => (
							<div
								key={item}
								className="items-center py-1 px-3 rounded-full flex gap-2 border border-[#3F0799] text-[#3F0799] text-xs bg-[#E7E2FF]"
							>
								{item}
								<IoCloseCircleOutline
									className="text-lg"
									onClick={() =>
										setSelectedCountries((prev) =>
											prev.filter((val) => val !== item)
										)
									}
								/>
							</div>
						))}
					</div>
				</div>
				<div>
					<label htmlFor="" className="text-sm">
						Fee
					</label>
					<div className="flex items-center rounded-md overflow-hidden relative">
						<span className="absolute top-3 left-4">%</span>
						<input
							type="number"
							className="h-full p-3 flex-1 rounded-l-md border-r-0 pl-10 bg-gray-50"
						/>
						<select
							name=""
							id=""
							className="h-full py-3.5 w-24 rounded-r-md bg-gray-200 text-xs outline-0 focus:outline-0"
						>
							<option>Percent</option>
							<option>fixed</option>
						</select>
					</div>
					{/* <BaseInput label="Fee" type="number" /> */}
				</div>
			</form>
		</div>
	);
}
