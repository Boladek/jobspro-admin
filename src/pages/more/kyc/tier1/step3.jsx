import PropTypes from "prop-types";
import tick from "../../../../assets/tick.png";
import { BaseButton } from "../../../../component/button";

export function Step3({ gotoNextPage }) {
	return (
		<div className="max-w-[400px] w-full">
			<div className="flex justify-center items-center mb-2">
				<img src={tick} alt="Tick Icon" className="h-32" />
			</div>
			<div className="text-center mb-8">
				<p className="font-bold text-2xl">
					Your BVN Your submission has been approved
				</p>
				<p className="text-xs text-gray-500">
					Please provide pending information for the details below
				</p>
			</div>
			<div>
				<ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
					<li className="mb-10 ms-6">
						<span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
							<svg
								className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 16 12"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M1 5.917 5.724 10.5 15 1.5"
								/>
							</svg>
						</span>
						<h3 className="font-bold leading-tight">BVN</h3>
						<p className="text-xs">
							Please provide us with your BVN number respectively.
						</p>
					</li>
					<li className="mb-10 ms-6">
						<span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
							<svg
								className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 16"
							>
								<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
							</svg>
						</span>
						<h3 className="font-bold leading-tight">Face Capture</h3>
						<p className="text-xs">
							Get a face shot by following the instructions that will be
							provided.
						</p>
					</li>
				</ol>
			</div>
			<div>
				<div>
					<BaseButton onClick={gotoNextPage}>Continue</BaseButton>
				</div>
			</div>
		</div>
	);
}
//
Step3.propTypes = {
	gotoNextPage: PropTypes.func,
};
