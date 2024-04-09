import PropTypes from "prop-types";

export function Modal({ children, handleClose, title, maxWidth = 400 }) {
	return (
		<div
			className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-70"
			style={{ zIndex: 10000 }}
		>
			<div
				className="bg-white p-4 rounded-xl relative inline-block"
				style={{ width: "100%", maxWidth }}
			>
				<div className="flex justify-end">
					<div className="flex-1 text-center">{title}</div>
					<div onClick={handleClose} className="cursor-pointer text-2xl">
						&#x2716;
					</div>
				</div>
				<div className="overflow-y-auto">{children}</div>
			</div>
		</div>
	);
}

Modal.propTypes = {
	maxWidth: PropTypes.number,
	handleClose: PropTypes.func,
	value: PropTypes.any,
	title: PropTypes.string,
	children: PropTypes.any,
};
