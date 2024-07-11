import { useMemo, useState } from "react";
import { GigComponent } from "../../../component/gig-component";
import { NoInfo } from "../../../component/no-info";
import { UseGig } from "../../../context/gig-context";

const tabs = ["Best Matches", "Remote", "On-Site"];

export function BestMatches() {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const {
		bestMatches,
		refetch,
		gettingGigs,
		searchText,
		category,
		min,
		max,
		time,
		experience,
	} = UseGig();

	console.log({ experience });

	function getWeekBounds(date) {
		const startOfWeek = new Date(date);
		const endOfWeek = new Date(date);
		const day = date.getDay();

		// Adjust the date to the start of the week (Monday)
		const diffToMonday = day === 0 ? 6 : day - 1; // If it's Sunday (0), move back 6 days
		startOfWeek.setDate(date.getDate() - diffToMonday);
		startOfWeek.setHours(0, 0, 0, 0);

		// Adjust the date to the end of the week (Sunday)
		const diffToSunday = day === 0 ? 0 : 7 - day; // If it's Sunday (0), no adjustment needed
		endOfWeek.setDate(date.getDate() + diffToSunday);
		endOfWeek.setHours(23, 59, 59, 999);

		return { startOfWeek, endOfWeek };
	}

	const filteredGigs = useMemo(() => {
		if (bestMatches.length > 0) {
			return (
				bestMatches
					.filter((gig) => {
						if (activeTab === tabs[0]) {
							return gig;
						}
						if (activeTab === tabs[1]) {
							return !gig.isPhysical;
						}
						if (activeTab === tabs[2]) {
							return gig.isPhysical;
						}
					})
					.filter((gig) => {
						const today = new Date();
						today.setHours(0, 0, 0, 0); // Set to start of day

						const tomorrow = new Date(today);
						tomorrow.setDate(today.getDate() + 1);

						const endOfWeek = new Date(today);
						const dayOfWeek = today.getDay();
						const daysToEndOfWeek = 6 - dayOfWeek;
						endOfWeek.setDate(today.getDate() + daysToEndOfWeek);

						const isSameDay = (date1, date2) => {
							return (
								date1.getFullYear() === date2.getFullYear() &&
								date1.getMonth() === date2.getMonth() &&
								date1.getDate() === date2.getDate()
							);
						};

						const gigDate = new Date(gig.gigDate);

						if (time === "all") {
							return gig;
						}
						if (time === "today") {
							return isSameDay(gigDate, today);
						}
						if (time === "tomorrow") {
							return isSameDay(gigDate, tomorrow);
						}
						if (time === "week") {
							return (
								getWeekBounds(new Date()).startOfWeek <= gigDate &&
								getWeekBounds(new Date()).endOfWeek >= gigDate
							);
						}
					})
					// .filter((gig) => {
					// 	if (experience) {
					// 		return experience === "exp"
					// 			? gig.gigInfos[0].isExperienced
					// 			: !gig.gigInfos[0].isExperienced;
					// 	}
					// 	return gig;
					// })
					.filter((gig) => {
						const titleMatch = gig?.gigInfos[0]?.title
							?.toLowerCase()
							?.includes(searchText.toLowerCase());
						const detailedDescriptionMatch = gig?.gigInfos[0]?.description
							?.toLowerCase()
							?.includes(searchText.toLowerCase());

						return titleMatch || detailedDescriptionMatch;
					})
					.filter((gig) =>
						gig?.subCategory?.name
							?.toLowerCase()
							?.includes(category.toLowerCase())
					)
					.filter((gig) => {
						const minMatch = Number(min)
							? Number(gig?.budget) >= Number(min)
							: true;
						const maxMatch = Number(max)
							? Number(gig?.budget) <= Number(max)
							: true;

						return minMatch && maxMatch;
					})
			);
		}
		return [];
	}, [
		activeTab,
		bestMatches,
		searchText,
		category,
		min,
		max,
		time,
		experience,
	]);

	console.log({ filteredGigs });

	return (
		<div className="p-4">
			<div className="flex bg-adminPrimary p-2 text-sm text-white w-full justify-evenly rounded-lg max-w-lg">
				{tabs.map((tab) => (
					<div
						className={`${
							activeTab === tab ? "border-b-yellow-300 border-b-4" : ""
						} p-0.5 cursor-pointer`}
						key={tab}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</div>
				))}
			</div>
			<div
				className="flex flex-col gap-4 mt-4 overflow-y-auto h-full"
				style={{ maxHeight: "80vh" }}
			>
				{gettingGigs ? (
					<div
						role="status"
						className="absolute top-0 left-0 w-full h-full bg-black/5 flex flex-col justify-center items-center"
					>
						<svg
							aria-hidden="true"
							className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
					</div>
				) : (
					<>
						{filteredGigs.length > 0 ? (
							filteredGigs.map((gig) => (
								<GigComponent key={gig.uuid} refetch={refetch} gig={gig} />
							))
						) : (
							<NoInfo message="No gig match this criteria at the moment." />
						)}
					</>
				)}
			</div>
		</div>
	);
}
