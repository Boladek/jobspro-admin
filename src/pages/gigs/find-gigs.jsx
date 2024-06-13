// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GigComponent } from "../../component/gig-component";
import { BaseInput } from "../../component/input";
import { SearchComponent } from "../../component/search-component";
import { BaseSelect } from "../../component/select";
import profileAxios from "../../helpers/profileAxios";

function GigsPage() {
	const { data: gigs = [], isLoading, refetch } = useQuery({
		queryKey: ["fetch-gig-pros"],
		queryFn: () => profileAxios.get("/pro-gigs/best-matches?page=1&limit=100"),
		select: (data) => data.data.data,
		staleTime: Infinity,
	});
	console.log({ gigs });
	return (
		<div className="flex bg-[#f6f7fa] h-full">
			<div className="max-w-sm w-full p-4 h-full max-h-full overflow-y-auto">
				<div className="mb-4">
					<span className="p-2 bg-white rounded-full text-xs cursor-pointer hover:outline hover:outline-primary">
						Refresh &#x21bb;
					</span>
				</div>
				<div className="w-full">
					<SearchComponent />
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
						<BaseSelect label="Select Category">
							<option></option>
						</BaseSelect>
					</div>
				</div>
				<div className="mt-4">
					<p className="font-bold text-sm mb-2">Experience Level</p>
					<div className="flex gap-2 items-center text-sm mb-2">
						<input type="radio" name="experience" id="exp" />
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
							<BaseInput placeholder="Min" type="number" />
						</div>
						<div className="flex-1">
							<BaseInput placeholder="Max" type="number" />
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
			<div className="flex-1 p-4 h-full flex flex-col">
				<p className="font-bold mb-2">
					Best Matches <span className="font-extralight">Most Recent</span>
				</p>
				<div className="bg-[#E5EFFF] p-4 rounded-xl text-xs text-primary mb-2">
					Search through the latest job openings that align with your skills and
					profile, ensuring they meet the criteria sought by business.
				</div>
				<div className="flex flex-col gap-2 flex-1">
					{gigs.map((item) => (
						<GigComponent key={item.uuid} gig={item} refetch={refetch} />
					))}
				</div>
			</div>
		</div>
	);
}

export default GigsPage;
