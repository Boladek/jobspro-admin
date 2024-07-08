import { string } from "prop-types";
import search from "../assets/search.png";

export function SearchComponent({ ...rest }) {
	return (
		<div className="relative w-full">
			<img
				src={search}
				className="h-6 absolute"
				style={{
					top: ".75rem",
					left: ".7rem",
				}}
			/>
			<input
				{...rest}
				placeholder="Search..."
				className="w-full pl-12 px-3 py-3 border text-sm rounded-full focus:outline-none focus:border-primary"
			/>
		</div>
	);
}

SearchComponent.propTypes = {
	className: string,
};
