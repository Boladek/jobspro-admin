import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function AdminLink({ link, isSelected }) {
	const navigate = useNavigate();
	return (
		<div
			className={`px-3 py-2 rounded-lg flex gap-2 items-center text-xs cursor-pointer hover:bg-[#E5EEFF] transition-all ease-linear 300s ${
				isSelected ? "bg-[#E5EEFF] text-[#1A68FF] font-bold" : "font-light"
			}`}
			onClick={() => navigate(link.url)}
		>
			<span>{link.title}</span>
			<link.icon fill={isSelected ? "#1A68FF" : "#667085"} />
		</div>
	);
}

AdminLink.propTypes = {
	link: PropTypes.object,
	isSelected: PropTypes.bool,
};
