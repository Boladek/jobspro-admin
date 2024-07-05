import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	formatDate,
	formatNumber,
	generateArray,
} from "../../helpers/function";
import avatar from "../../assets/profile-avatar.png";
import ReactPaginate from "react-paginate";
import { KycTag } from "../../component/kyc-tag";
import { ManageGigsPro } from "./gig-details/manage-gigs-pro";
import { ManageGigsBusiness } from "./gig-details/manage-gigs-business";
import { DashBoardWrapper } from "../../component/dashboard-wrapper";

const proTabs = ["Applied", "Active", "Archived"];
const busTabs = ["Active", "Archived"];

function ManageGigs() {
	// const navigate = useNavigate();
	const { role } = useParams();
	// const itemsPerPage = 10;
	// const items = generateArray(40);
	// let tabs = role === "pro" ? proTabs : busTabs;
	// const [activeTab, setActiveTab] = useState(tabs[0]);

	// const [itemOffset, setItemOffset] = useState(0);

	// // Simulate fetching items from another resources.
	// // (This could be items from props; or items loaded in a local state
	// // from an API endpoint with useEffect and useState)
	// const endOffset = itemOffset + itemsPerPage;
	// // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	// const currentItems = items.slice(itemOffset, endOffset);
	// const pageCount = Math.ceil(items.length / itemsPerPage);

	// // Invoke when user click to request another page.
	// const handlePageClick = (event) => {
	// 	const newOffset = (event.selected * itemsPerPage) % items.length;
	// 	// console.log(
	// 	// 	`User requested page number ${event.selected}, which is offset ${newOffset}`
	// 	// );
	// 	setItemOffset(newOffset);
	// };

	useEffect(() => {
		document.title = "Jobs Pro | Gigs";
	}, []);

	return (
		<DashBoardWrapper>
			{role === "pro" ? <ManageGigsPro /> : <ManageGigsBusiness />}
		</DashBoardWrapper>
	);
}

export default ManageGigs;
