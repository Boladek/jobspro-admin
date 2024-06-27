import PropTypes from "prop-types";

export function Switch({ checked, handleChecked, color = "#206DB0" }) {
	return (
		<div className="w-full">
			<div
				className={`rounded-full border-2 w-8 cursor-pointer transition-all ease-linear`}
				onClick={handleChecked}
				style={{
					backgroundColor: !checked ? "#fff" : color,
					borderColor: color,
				}}
			>
				<div
					className={`p-0.5 h-3.5 w-3.5 rounded-full transition-all ease-linear ${
						checked ? "ml-auto " : "mr-auto"
					}`}
					style={{
						backgroundColor: checked ? "#fff" : color,
					}}
				/>
			</div>
		</div>
	);
}

Switch.propTypes = {
	checked: PropTypes.bool,
	handleChecked: PropTypes.func,
	color: PropTypes.string,
};
