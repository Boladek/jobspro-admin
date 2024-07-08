import { BestMatches } from "./best-matches";
import { DashBoardWrapper } from "../../../component/dashboard-wrapper";
import { TopSection } from "./top-section";

export function ProDashBoard() {
	return (
		<DashBoardWrapper topSection={<TopSection />}>
			<BestMatches />
		</DashBoardWrapper>
	);
}
