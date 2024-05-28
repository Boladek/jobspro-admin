// import { useState } from "react";
// import { Step1 } from "./tier1/Step1";
// import { Step2 } from "./tier1/Step2";
import { useEffect } from "react";
import Tier1 from "./tier1";
import { useQuery } from "@tanstack/react-query";
import kycAxios from "../../../helpers/kycAxios";
// import StorageService from "../../../helpers/storage";

function KYCPage() {
	useEffect(() => {
		document.title = "Jobs Pro | KYC";
	}, []);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["kyc-status"],
		queryFn: () => kycAxios.get("/kyc/status"),
		select: (data) => data,
		retry: 2,
		staleTime: Infinity,
	});
	// const [step, setStep] = useState(1);
	return (
		<div className="flex justify-center p-4">
			<Tier1 />
			{/* {step === 1 && <Step1 gotoNextPage={() => setStep(2)} />}
			{step === 2 && <Step2 gotoNextPage={() => setStep(3)} />} */}
		</div>
	);
}

export default KYCPage;
