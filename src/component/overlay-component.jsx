import PropTypes from "prop-types";

export function Overlay({ message = "" }) {
	return (
		<div
			className="fixed w-full top-0 left-0 h-screen z-1000 flex justify-center items-center"
			style={{
				background: "rgba(32, 109, 176, .7)",
				zIndex: 10000000,
			}}
		>
			<div className="p-4 max-w-sm min-w-36 w-full">
				<p className="text-[#f8f8f8] text-center text-md mb-1">
					Please Wait... {message}
				</p>
				<div className="progress"></div>
			</div>
		</div>
	);
}

Overlay.propTypes = {
	message: PropTypes.string,
};
