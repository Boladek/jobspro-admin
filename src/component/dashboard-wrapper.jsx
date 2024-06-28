import { node } from "prop-types";
import { GigStatsBusiness } from "./gig-stats-business";
import { GigStatsPro } from "./gig-stats-pro";
import { UseAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../assets/add-icon";
import { ProfileBadge } from "./profile-badge";
import { IoIosSearch } from "react-icons/io";

export function DashBoardWrapper({ children }) {
	const navigate = useNavigate();
	const { name, user } = UseAuth();
	return (
		<div className="h-full flex gap-2 bg-white">
			<div className="hidden md:block w-80 p-4">
				{user.userType === "pro" ? <GigStatsPro /> : <GigStatsBusiness />}
			</div>
			<div className="flex-1 ">
				{user.userType !== "pro" && (
					<div className="py-2 px-4 flex gap-4 items-center">
						<div className="flex gap-2 text-xs items-center">
							<span className="bg-[#FEDF00] px-3 py-1 rounded-lg">
								Gigs Posted
							</span>
							<span className="text-sm font-bold text-adminPrimary">
								{name}
							</span>
						</div>
						<div className="max-w-sm w-full relative">
							<input
								type="text"
								className="rounded-full text-xs bg-gray-100 w-full pl-10 border-gray-200"
								placeholder="Search for gigs"
							/>
							<IoIosSearch className="absolute top-1.5 left-2 text-2xl" />
						</div>
						<div className="flex-1">
							<div
								className="p-2 bg-adminPrimary w-fit rounded-full ml-auto"
								onClick={() => navigate(`/gigs/${user?.userType}/create-gig`)}
							>
								<PlusIcon />
							</div>
						</div>
					</div>
				)}
				<div className="flex">
					<div className="w-2/3">{children}</div>
					<div className="p-4">
						<ProfileBadge />
					</div>
				</div>
			</div>
		</div>
	);
}

DashBoardWrapper.propTypes = {
	children: node,
};
