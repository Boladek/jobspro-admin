import { CgUnavailable } from "react-icons/cg";
import { string } from "prop-types";

export function NoInfo({ message = "" }) {
	return (
		<div className="text-center">
			<div className="flex justify-center">
				<CgUnavailable className="text-9xl text-rose-500" />
			</div>
			<p className="text-sm font-semibold text-gray-500">{message}</p>
		</div>
	);
}

NoInfo.propTypes = {
	message: string,
};
