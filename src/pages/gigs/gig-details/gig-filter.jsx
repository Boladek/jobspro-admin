import { useState } from "react";
import PropTypes from "prop-types";
import { SearchComponent } from "../../../component/search-component";
import { BaseSelect } from "../../../component/select";
import { BaseInput } from "../../../component/input";
import { FilterIcon } from "../../../assets/filter-icon";
import { Modal } from "../../../component/modal";

export function GigFilter({
	refetch,
	searchText,
	setSearchText,
	category,
	allCategories,
	setCategory,
	setMin,
	setMax,
	min,
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				className="md:hidden border border-gray-500 p-2 rounded-full w-fit ml-auto m-2"
				onClick={() => setOpen(true)}
			>
				<FilterIcon />
			</div>
			<div className="hidden md:block max-w-sm w-full p-4 h-full max-h-full">
				<div className="mb-4">
					<span
						onClick={refetch}
						className="p-2 bg-white rounded-full text-xs cursor-pointer hover:outline hover:outline-primary"
					>
						Refresh &#x21bb;
					</span>
				</div>
				<div className="w-full mb-4">
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
								min={min}
								onChange={(e) => setMax(e.target.value)}
							/>
						</div>
					</div>
				</div>
				{/* <div className="mt-4">
					<p className="font-bold text-sm mb-2">Location</p>
					<div>
						<BaseSelect label="Select location">
							<option></option>
						</BaseSelect>
					</div>
				</div> */}
			</div>
			{open && (
				<Modal open={open} handleClose={() => setOpen(false)}>
					<p className="font-bold">Filter Results</p>
					<div className="py-2">
						<div className="mb-4">
							<span
								onClick={refetch}
								className="border p-2 bg-white rounded-full text-xs cursor-pointer hover:outline hover:outline-primary"
							>
								Refresh &#x21bb;
							</span>
						</div>
						<div className="w-full mb-4">
							<SearchComponent
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
						</div>
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
										min={min}
										onChange={(e) => setMax(e.target.value)}
									/>
								</div>
							</div>
						</div>
						{/* <div className="mt-4">
					<p className="font-bold text-sm mb-2">Location</p>
					<div>
						<BaseSelect label="Select location">
							<option></option>
						</BaseSelect>
					</div>
				</div> */}
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
