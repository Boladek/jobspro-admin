// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GigComponent } from "../../component/gig-component";
import { BaseInput } from "../../component/input";
import { SearchComponent } from "../../component/search-component";
import { BaseSelect } from "../../component/select";
import profileAxios from "../../helpers/profileAxios";
import { useMemo, useState } from "react";

function GigsPage() {
	const [searchText, setSearchText] = useState("");
	const [category, setCategory] = useState("");
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(100000000);

	const {
		data: gigs = [],
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["fetch-gig-pros"],
		queryFn: () => profileAxios.get("/pro-gigs/best-matches?page=1&limit=100"),
		select: (data) => data.data.data,
		staleTime: Infinity,
	});

	const gigsData = useMemo(() => {
		if (gigs.length > 0) {
			return gigs
				.filter((gig) => {
					const titleMatch = gig?.gigInfos[0]?.title
						?.toLowerCase()
						?.includes(searchText.toLowerCase());
					const detailedDescriptionMatch = gig?.gigInfos[0]?.description
						?.toLowerCase()
						?.includes(searchText.toLowerCase());

					return titleMatch || detailedDescriptionMatch;
				})
				.filter((gig) =>
					gig?.subCategory?.name
						?.toLowerCase()
						?.includes(category.toLowerCase())
				)
				.filter((gig) => {
					const minMatch =
						min !== undefined ? Number(gig?.budget) >= Number(min) : true;
					const maxMatch =
						max !== undefined ? Number(gig?.budget) <= Number(max) : true;

					return minMatch && maxMatch;
				});
		}
		return [];
	}, [gigs, searchText, min, max, category]);

	const allCategories = useMemo(() => {
		if (gigs.length > 0) {
			return [...new Set(gigs.map((gig) => gig.subCategory.name))];
		}
		return [];
	}, [gigs]);

	// const allLocations = useMemo(() => {
	// 	if (gigs.length > 0) {
	// 		return [...new Set(gigs.map((gig) => gig.subCategory.name))];
	// 	}
	// 	return [];
	// }, [gigs]);

	// console.log({ allCategories });

	return (
		<div className="flex bg-[#f6f7fa] h-full max-h-svh">
			<div className="max-w-sm w-full p-4 h-full max-h-full">
				<div className="mb-4">
					<span
						onClick={refetch}
						className="p-2 bg-white rounded-full text-xs cursor-pointer hover:outline hover:outline-primary"
					>
						Refresh &#x21bb;
					</span>
				</div>
				<div className="w-full">
					<SearchComponent
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
				<p className="font-bold mb-2">Filter</p>
				<div>
					<p className="font-bold text-sm mb-2">Date</p>
					<div className="flex gap-2 items-center text-sm mb-2">
						<input type="radio" name="date" id="all" />
						<label htmlFor="all">All</label>
					</div>
					<div className="flex gap-2 items-center text-sm mb-2">
						<input type="radio" name="date" id="today" />
						<label htmlFor="today">Today</label>
					</div>
					<div className="flex gap-2 items-center text-sm mb-2">
						<input type="radio" name="date" id="tomorrow" />
						<label htmlFor="tomorrow">Tomorrow</label>
					</div>
					<div className="flex gap-2 items-center text-sm">
						<input type="radio" name="date" id="week" />
						<label htmlFor="week">This week</label>
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-sm mb-2">Category</p>
					<div>
						<BaseSelect
							label="Select Category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value=""></option>
							{allCategories.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
							))}
						</BaseSelect>
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-sm mb-2">Experience Level</p>
					<div className="flex gap-2 items-center text-sm mb-2">
						<input
							type="radio"
							name="experience"
							id="exp"
							value="experienced"
						/>
						<label htmlFor="exp">Experienced</label>
					</div>
					<div className="flex gap-2 items-center text-sm mb-2">
						<input type="radio" name="experience" id="non-exp" />
						<label htmlFor="non-exp">Non-Experience</label>
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-sm mb-2">Price Range</p>
					<div className="flex gap-2">
						<div className="flex-1">
							<BaseInput
								placeholder="Min"
								type="number"
								onChange={(e) => setMin(e.target.value)}
								min={0}
							/>
						</div>
						<div className="flex-1">
							<BaseInput
								placeholder="Max"
								type="number"
								onChange={(e) => setMax(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-sm mb-2">Location</p>
					<div>
						<BaseSelect label="Select location">
							<option></option>
						</BaseSelect>
					</div>
				</div>
			</div>
			<div className="flex-1 p-4 h-full flex flex-col overflow-y-auto">
				<p className="font-bold mb-2">
					Best Matches <span className="font-extralight">Most Recent</span>
				</p>
				<div className="bg-[#E5EFFF] p-4 rounded-xl text-xs text-primary mb-2">
					Search through the latest job openings that align with your skills and
					profile, ensuring they meet the criteria sought by business.
				</div>
				<div className="flex flex-col gap-2 flex-1">
					{(isLoading || isRefetching) && (
						<div className="flex justify-center p-4">
							<svg
								aria-hidden="true"
								className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
						</div>
					)}
					{gigsData.length > 0 ? (
						<>
							{gigsData.map((item) => (
								<GigComponent key={item.uuid} gig={item} refetch={refetch} />
							))}
						</>
					) : (
						<div className="p-4">
							<p className="font-bold text-sm">
								No gigs match this filter criteria
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default GigsPage;
