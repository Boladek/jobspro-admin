import { FaStar } from "react-icons/fa";
import { generateArray } from "../helpers/function";
import PropTypes from "prop-types";

export function StarRating({ size = 1, rating, handleRating }) {
	return (
		<div className="flex">
			{generateArray(5).map((_, index) => {
				const currIndex = index + 1;
				let id = "rating-" + Math.random(index);
				return (
					<>
						<label className="cursor-pointer" htmlFor={id}>
							<input
								type="radio"
								name="rate"
								value={currIndex}
								onClick={() => handleRating(currIndex)}
								className="hidden"
								id={id}
							/>
							<FaStar
								size={size * 50}
								color={currIndex <= rating ? "#FFD700" : "grey"}
							/>
						</label>
					</>
				);
			})}
		</div>
	);
}

StarRating.propTypes = {
	size: PropTypes.number,
	rating: PropTypes.number.isRequired,
	handleRating: PropTypes.func.isRequired,
};
