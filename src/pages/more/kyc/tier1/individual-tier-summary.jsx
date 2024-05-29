import PropTypes from "prop-types";
import { BaseButton } from "../../../../component/button";
import { SemiCircleProgressBar } from "../../../../component/semi-circle-bar";
import { useSelector } from "react-redux";

export function IndividualTierSummary({ gotoNextPage }) {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className="max-w-[400px] w-full">
			<div className="flex justify-center mb-2">
				<SemiCircleProgressBar color="#42BE65" progress={75} />
			</div>
			<div className="text-center">
				<p className="text-2xl font-bold">You’re almost there 😍</p>
				<p className="text-xs text-black/50">
					Please take sometime to complete your Tier 1 KYC, so we help you find
					a gig
				</p>
			</div>
			<div className="text-center py-4">
				<p className="font-bold mb-1">Perks of Tier 1</p>
				<div className="flex gap-2 items-center justify-center">
					<span className="text-3xl font-semibold">N50,000</span>
					<span className="text-sm text-black/50">per day</span>
				</div>
			</div>
			<div className="mb-4">
				<p className="font-bold text-sm mb-1">Tier 1 Requirement</p>
				<div className="border border-gray-300 p-3 rounded-md mb-4">
					<p className="font-bold text-sm">BVN</p>
					<p className="text-gray-400 text-xs">
						Please provide us with your BVN number.
					</p>
				</div>
				<div className="border border-gray-300 p-3 rounded-md">
					{user.userType === "business" ? (
						<>
							<p className="font-bold text-sm">Business Verification</p>
							<p className="text-gray-400 text-xs">
								Please provide us with your CAC registration number.
							</p>
						</>
					) : (
						<>
							<p className="font-bold text-sm">Face Capture</p>
							<p className="text-gray-400 text-xs">
								Get a face shot by following the instructions that will be
								provided.
							</p>
						</>
					)}
				</div>
			</div>
			<div>
				<p className="text-xs text-gray-400 text-center mb-2">
					By clicking on continue, you consent to provide us with the requested
					data.
				</p>
				<div>
					<BaseButton onClick={gotoNextPage}>Continue</BaseButton>
				</div>
			</div>
		</div>
	);
}

IndividualTierSummary.propTypes = {
	gotoNextPage: PropTypes.func,
};
