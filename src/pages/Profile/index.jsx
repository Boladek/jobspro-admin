import { useParams } from "react-router-dom";
import { ClientProfile } from "./client-profile";
import { ProProfile } from "./pro-profile";

function ClientProfileFlow() {
	const { role } = useParams();
	return (
		<>
			{(role === "individual" || role === "business" || role === "agent") && (
				<ClientProfile />
			)}
			{role === "pro" && <ProProfile />}
		</>
	);
}

export default ClientProfileFlow;
