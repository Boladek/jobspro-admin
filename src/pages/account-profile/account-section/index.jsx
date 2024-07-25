import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import gear from "../../../assets/gear.svg";
import rating from "../../../assets/rating.svg";
import feedback from "../../../assets/feedback.svg";
import block from "../../../assets/block.svg";
import deleteIcon from "../../../assets/delete.svg";
import { useState } from "react";
import { DeleteAccount } from "./delete-account";
import { FeedBack } from "./feedback";
import { BlockAccount } from "./block";

export function AccountSection() {
	const { openAccount, handleCloseAccount } = UseModal();
	const [active, setActive] = useState("");
	return (
		<SideWrapper
			handleClose={handleCloseAccount}
			title="Account"
			open={openAccount}
		>
			<div className="max-w-[400px]">
				<div className="flex gap-4 items-center mb-8">
					<img src={gear} className="h-16" />

					<p className="text-sm text-gray-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis,
						dicta porro optio nostrum nisi tempore a recusandae.
					</p>
				</div>
				{active === "" && (
					<div className="pt-4 grid grid-cols-1 gap-8">
						<div className="p-4 flex gap-4 items-center border border-adminPrimary rounded-lg">
							<img src={rating} className="h-8" />
							<div>
								<p className="font-bold text-sm text-adminPrimary">Rate</p>
								<p className="text-xs text-gray-400">
									Please rate us on Google play
								</p>
							</div>
						</div>
						<div
							className="p-4 flex gap-4 items-center border border-adminPrimary rounded-lg"
							onClick={() => setActive("feedback")}
						>
							<img src={feedback} className="h-8" />
							<div>
								<p className="font-bold text-sm text-adminPrimary">Feedback</p>
								<p className="text-xs text-gray-400">
									Help us become better, report a bug, suggest a feature
								</p>
							</div>
						</div>
						<div
							className="p-4 flex gap-4 items-center border border-adminPrimary rounded-lg"
							onClick={() => setActive("block")}
						>
							<img src={block} className="h-8" />
							<div>
								<p className="font-bold text-sm text-adminPrimary">
									Block my account
								</p>
								<p className="text-xs text-gray-400">
									Kindly use if you suspect your account has been compromised
								</p>
							</div>
						</div>
						<div
							className="p-4 flex gap-4 items-center border border-adminPrimary rounded-lg"
							onClick={() => setActive("delete")}
						>
							<img src={deleteIcon} className="h-8" />
							<div>
								<p className="font-bold text-sm text-red-500">Delete Account</p>
								<p className="text-xs text-gray-400">
									It will be sad to see you go
								</p>
							</div>
						</div>
					</div>
				)}

				{active === "delete" && <DeleteAccount goBack={() => setActive("")} />}

				{active === "feedback" && <FeedBack goBack={() => setActive("")} />}

				{active === "block" && <BlockAccount goBack={() => setActive("")} />}
			</div>
		</SideWrapper>
	);
}
