import { PostedGigs } from "./posted-gigs";
import { DashBoardWrapper } from "../../../component/dashboard-wrapper";
import { TopSection } from "./top-section";

export function BusinessDashBoard() {
	return (
		<DashBoardWrapper topSection={<TopSection />}>
			<PostedGigs />
		</DashBoardWrapper>
	);
}
