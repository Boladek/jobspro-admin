import PropTypes from "prop-types";

export function Switch({ checked, handleChecked }) {
	return (
		<div className="w-full">
			<div
				className={`rounded-full border-2 border-primary w-8 cursor-pointer transition-all ease-linear ${
					checked ? "bg-primary" : "bg-white"
				}`}
				onClick={handleChecked}
			>
				<div
					className={`p-0.5 h-3.5 w-3.5 rounded-full transition-all ease-linear ${
						checked ? "ml-auto bg-white" : "mr-auto bg-primary"
					}`}
				></div>
			</div>
		</div>
	);
}

Switch.propTypes = {
	checked: PropTypes.bool,
	handleChecked: PropTypes.func,
};
