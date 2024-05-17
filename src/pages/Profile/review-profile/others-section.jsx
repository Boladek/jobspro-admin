import PropTypes from "prop-types";
import { EditIcon } from "../../../assets/edit-icon";

export function OtherSection({ children, title }) {
	return (
		<div className="px-2 py-4 border border-blue-200 rounded-xl mb-4">
			<div className="flex justify-between mb-4">
				<p className="text-[#206DB0] text-lg font-bold">{title}</p>
				{/* <img src={edit} className="h-7" /> */}
				<EditIcon />
			</div>
			{children}
		</div>
	);
}

OtherSection.propTypes = {
	children: PropTypes.children,
	title: PropTypes.string,
};
