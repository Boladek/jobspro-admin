import PropTypes from "prop-types";
import { WalletIcon } from "../../assets/wallet-icon";
import { FolderIcon } from "../../assets/admin/folder-icon";

export function DisputeTimeline({ children }) {
	return (
		<li className="mb-4 ms-6">
			<span
				className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 bg-gray-300 dark:bg-green-900`}
			>
				<FolderIcon fill="gray" />
			</span>
			<div>{children}</div>
		</li>
	);
}

DisputeTimeline.propTypes = {
	children: PropTypes.node,
};
