import { useParams } from "react-router-dom";
import { ClientProfile } from "./client-profile";
import { ProProfile } from "./pro-profile";

function ClientProfileFlow() {
	const { role } = useParams();
	console.log({ role });
	return (
		<>
			{false &&
				(role === "individual" || role === "business" || role === "agent") && (
					<ClientProfile />
				)}
			{true && <ProProfile />}
		</>
	);
}

export default ClientProfileFlow;
