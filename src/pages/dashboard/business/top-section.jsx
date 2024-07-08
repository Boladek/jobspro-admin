import { PlusIcon } from "../../../assets/add-icon";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../../context/auth-context";
import { UseGig } from "../../../context/gig-context";

export function TopSection() {
	const navigate = useNavigate();
	const { user, name } = UseAuth();
	const { searchText, handleSearch } = UseGig();

	return (
		<div className="py-2 px-4 flex gap-4 items-center flex-wrap">
			<div className="flex gap-2 text-xs items-center">
				<span className="bg-[#FEDF00] px-3 py-1 rounded-lg">Gigs Posted</span>
				<span className="text-sm font-bold text-adminPrimary">{name}</span>
			</div>
			<div className="max-w-sm w-full relative flex gap-2">
				<input
					type="text"
					className="rounded-full text-xs bg-gray-100 w-full pl-10 border-gray-200"
					placeholder="Search for gigs"
					onChange={handleSearch}
					value={searchText}
				/>
				<IoIosSearch className="absolute top-2 left-2 text-2xl" />
				<div
					className="p-2 bg-adminPrimary w-fit rounded-full ml-auto"
					onClick={() => navigate(`/gigs/${user?.userType}/create-gig`)}
				>
					<PlusIcon />
				</div>
			</div>
		</div>
	);
}
