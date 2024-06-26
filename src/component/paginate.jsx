import PropTypes from "prop-types";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export function Paginate({
	total,
	options,
	handlePageClick,
	handleOptions,
	perPage,
	currentPage,
}) {
	const totalPages = Math.ceil(total / perPage);
	const handleClick = (val) => {
		if (
			currentPage === 1 &&
			val > 1 &&
			currentPage === totalPages &&
			val < totalPages &&
			currentPage > 1 &&
			currentPage < totalPages
		) {
			handlePageClick(val);
		}
		return;
	};

	return (
		<div className="flex justify-center p-2 gap-4 items-center text-sm text-gray-600 select-none">
			<div>
				Rows per page:{" "}
				<select
					onChange={handleOptions}
					className="outline-0 outline-none border-0 text-xs w-fit"
				>
					{options.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div>
				{currentPage}- {totalPages} of {total}
			</div>
			<div className="flex gap-3 items-center text-base">
				<span>
					<MdKeyboardArrowLeft
						className="hover:bg-gray-200 cursor-pointer"
						onClick={() => handleClick(currentPage - 1)}
					/>
				</span>
				<span>
					<MdKeyboardArrowRight
						className="hover:bg-gray-200 cursor-pointer"
						onClick={() => handleClick(currentPage + 1)}
					/>
				</span>
			</div>
		</div>
	);
}

Paginate.propTypes = {
	total: PropTypes.number,
	pageCount: PropTypes.number,
	itemsPerPage: PropTypes.number,
	options: PropTypes.array,
	handlePageClick: PropTypes.func,
	handleOptions: PropTypes.func,
	perPage: PropTypes.number,
	currentPage: PropTypes.number,
};
