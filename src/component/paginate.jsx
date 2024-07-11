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

	const gotoNext = (value) => {
		if (value >= totalPages) {
			return;
		}
		handlePageClick(value);
	};
	const gotoPrev = (value) => {
		if (value < 0) {
			return;
		}
		handlePageClick(value);
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
				{currentPage + 1}- {totalPages} of {total}
			</div>
			<div className="flex gap-3 items-center text-base">
				<span>
					<MdKeyboardArrowLeft
						className="hover:bg-gray-200 cursor-pointer"
						onClick={() => gotoPrev(currentPage - 1)}
					/>
				</span>
				<span>
					<MdKeyboardArrowRight
						className="hover:bg-gray-200 cursor-pointer"
						onClick={() => gotoNext(currentPage + 1)}
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
