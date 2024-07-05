import { node } from "prop-types";
import { GigStatsBusiness } from "./gig-stats-business";
import { GigStatsPro } from "./gig-stats-pro";
import { UseAuth } from "../context/auth-context";
import { ProfileBadge } from "./profile-badge";

export function DashBoardWrapper({ children, topSection }) {
	const { user } = UseAuth();
	return (
		<div className="h-full flex gap-2 bg-white">
			<div className="hidden md:block w-80 p-4">
				{user.userType === "pro" ? <GigStatsPro /> : <GigStatsBusiness />}
			</div>
			<div className="flex-1 ">
				{topSection}
				<div className="flex">
					<div className="w-full md:w-3/4">{children}</div>
					<div className="p-4 hidden md:block">
						<ProfileBadge />
					</div>
				</div>
			</div>
		</div>
	);
}

DashBoardWrapper.propTypes = {
	children: node.isRequired,
	topSection: node,
};
