import { useQuery } from "@tanstack/react-query";
import { SearchComponent } from "../../../component/search-component";
import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import { generateArray } from "../../../helpers/function";
import { FAQWrapper } from "./faq-wrapper";
import profileAxios from "../../../helpers/profileAxios";

export function FAQSection() {
	const { openFaq, handleCloseFaq } = UseModal();
	const {
		data: faqs = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["faqs"],
		queryFn: () => profileAxios.get("/help/faq"),
		select: (data) => data,
		staleTime: Infinity,
	});

	// console.log({ faqs });

	return (
		<SideWrapper open={openFaq} handleClose={handleCloseFaq} title="FAQs">
			<div className="mb-4">
				<SearchComponent />
			</div>
			<div className="grid grid-cols-1 gap-4">
				{generateArray(6).map(() => (
					<FAQWrapper key={Math.random()} title="Question">
						Hello world
					</FAQWrapper>
				))}
			</div>
		</SideWrapper>
	);
}
