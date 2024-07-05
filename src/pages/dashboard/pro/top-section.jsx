import { IoIosSearch } from "react-icons/io";
import { UseGig } from "../../../context/gig-context";
import { GigFilter } from "../../gigs/gig-details/gig-filter";

export function TopSection() {
	const { searchText, handleSearch } = UseGig();

	return (
		<div className="py-2 px-4 flex gap-4 items-center flex-wrap">
			<div className="hidden md:flex gap-2 text-xs items-center">
				<span className="bg-[#FEDF00] px-3 py-1 rounded-lg font-bold">
					Gigs Posted
				</span>
				{/* <span className="text-sm font-bold text-adminPrimary">{name}</span> */}
			</div>
			<div className="max-w-md w-full relative flex gap-2 items-center">
				<input
					type="text"
					className="rounded-full text-xs bg-gray-100 w-full pl-10 border-gray-200"
					placeholder="Search for gigs"
					onChange={handleSearch}
					value={searchText}
				/>
				<IoIosSearch className="absolute top-2 left-2 text-2xl" />
				<div>
					<GigFilter />
				</div>
			</div>
		</div>
	);
}
