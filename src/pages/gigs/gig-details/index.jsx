import { useSelector } from "react-redux";
import { GigSummaryPro } from "./pro";
import { GigSummaryBusiness } from "./business";

function GigDetailsSummary() {
	const { user } = useSelector((state) => state.auth);

	return (
		<>{user.userType === "pro" ? <GigSummaryPro /> : <GigSummaryBusiness />}</>
	);
}

export default GigDetailsSummary;
