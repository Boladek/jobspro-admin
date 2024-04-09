import search from "../assets/search.png";

export function SearchComponent() {
	return (
		<div className="relative w-full">
			<img
				src={search}
				className="h-4 absolute"
				style={{
					top: ".75rem",
					left: ".7rem",
				}}
			/>
			<input
				placeholder="Search..."
				className="w-full pl-8 px-3 py-2 border text-sm rounded-md focus:outline-none focus:border-[#004B88]"
			/>
		</div>
	);
}
