import { useState } from "react";
import PropTypes from "prop-types";
import { SearchComponent } from "../../../component/search-component";
import { BaseSelect } from "../../../component/select";
import { BaseInput } from "../../../component/input";
import { FilterIcon } from "../../../assets/filter-icon";
import { Modal } from "../../../component/modal";
import { UseGig } from "../../../context/gig-context";

export function GigFilter() {
	const {
		// searchText,
		// handleSearch,
		handleMin,
		handleMax,
		min,
		handleCategory,
		allCategories,
		category,
		refetch,
		handleTime,
		handleExperience,
	} = UseGig();
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				className="border border-gray-500 rounded-full w-fit bg-white cursor-pointer p-1.5"
				onClick={() => setOpen(true)}
			>
				<FilterIcon />
			</div>
			{open && (
				<Modal open={open} handleClose={() => setOpen(false)}>
					<p className="font-bold p-1">Filter Results</p>
					<div className="px-1 pb-8">
						<div className="mb-4">
							<span
								onClick={refetch}
								className="border p-2 bg-white rounded-full text-xs cursor-pointer hover:outline hover:outline-primary"
							>
								Refresh &#x21bb;
							</span>
						</div>
						{/* <div className="w-full mb-4">
							<SearchComponent value={searchText} onChange={handleSearch} />
						</div> */}
						<div>
							<p className="font-bold text-sm mb-2">Date</p>
							<div className="flex gap-2 items-center text-sm mb-2">
								<input
									type="radio"
									name="date"
									id="all"
									value="all"
									onChange={handleTime}
								/>
								<label htmlFor="all">All</label>
							</div>
							<div className="flex gap-2 items-center text-sm mb-2">
								<input
									type="radio"
									name="date"
									value="today"
									id="today"
									onChange={handleTime}
								/>
								<label htmlFor="today">Today</label>
							</div>
							<div className="flex gap-2 items-center text-sm mb-2">
								<input
									type="radio"
									name="date"
									id="tomorrow"
									value="tomorrow"
									onChange={handleTime}
								/>
								<label htmlFor="tomorrow">Tomorrow</label>
							</div>
							<div className="flex gap-2 items-center text-sm">
								<input
									type="radio"
									name="date"
									id="week"
									value="week"
									onChange={handleTime}
								/>
								<label htmlFor="week">This week</label>
							</div>
						</div>
						<div className="mt-4">
							<p className="font-bold text-sm mb-2">Category</p>
							<div>
								<BaseSelect
									label="Select Category"
									value={category}
									onChange={handleCategory}
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
									value="exp"
									onChange={handleExperience}
								/>
								<label htmlFor="exp">Experienced</label>
							</div>
							<div className="flex gap-2 items-center text-sm mb-2">
								<input
									type="radio"
									name="experience"
									id="non-exp"
									value="non-exp"
									onChange={handleExperience}
								/>
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
										onChange={handleMin}
										min={0}
									/>
								</div>
								<div className="flex-1">
									<BaseInput
										placeholder="Max"
										type="number"
										min={min}
										onChange={handleMax}
									/>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}

GigFilter.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
	openDispute: PropTypes.func,
	openReview: PropTypes.func,
	refetch: PropTypes.func,
	searchText: PropTypes.string,
	setSearchText: PropTypes.any,
	category: PropTypes.string,
	allCategories: PropTypes.array,
	setCategory: PropTypes.any,
	setMin: PropTypes.any,
	setMax: PropTypes.any,
	min: PropTypes.string,
};
