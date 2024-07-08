import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GigSummaryPro } from "./pro";
import { GigSummaryBusiness } from "./business";

const tabs = ["Details", "Timeline", "Chat"];

function GigDetailsSummary() {
	const navigate = useNavigate();
	const location = useLocation();
	const gigData = location?.state?.gigData;
	const { user } = useSelector((state) => state.auth);
	const [activeTab, setActiveTab] = useState(tabs[0]);

	return (
		<>{user.userType === "pro" ? <GigSummaryPro /> : <GigSummaryBusiness />}</>
	);
}

export default GigDetailsSummary;
