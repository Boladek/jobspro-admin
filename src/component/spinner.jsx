import PropTypes from "prop-types";

export function Spinner({ size = 1.5 }) {
	return (
		<div
			className="spinner"
			style={{
				height: `${1 * size}rem`,
				width: `${1 * size}rem`,
			}}
		></div>
	);
}

Spinner.propTypes = {
	size: PropTypes.number,
};
