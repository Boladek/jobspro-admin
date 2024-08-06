import PropTypes from "prop-types";

export function SideWrapper({ handleClose, children, title }) {
	return (
		<div
			className="fixed top-0 left-0 w-screen h-screen bg-gray-400/30 flex justify-end"
			style={{
				zIndex: 20,
			}}
			onClick={handleClose}
		>
			<div
				className="bg-white p-2 md:px-8 md:py-4 w-fit max-w-2xl flex flex-col min-w-[400px] h-full"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between p-2 items-center">
					<p className="text-adminPrimary font-bold">{title}</p>
					<span
						className="cursor-pointer hover:opacity-80 text-3xl text-red-500 font-bold"
						onClick={handleClose}
					>
						&times;
					</span>
				</div>
				<div className="p-2 flex-1 min-h-96 overflow-y-auto">{children}</div>
			</div>
		</div>
	);
}

SideWrapper.propTypes = {
	children: PropTypes.node,
	handleClose: PropTypes.func,
	title: PropTypes.string,
};
