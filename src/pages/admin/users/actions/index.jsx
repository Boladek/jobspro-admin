import { SuspendUser } from "./suspend-user";
import { DeactivateUser } from "./deactivate-user";
import { UpdateTier } from "./update-tier";

export function UserActions() {
	return (
		<div className="grid grid-cols-1 gap-4 max-w-[400px] pt-4">
			<UpdateTier />
			<DeactivateUser />
			<SuspendUser />
		</div>
	);
}
