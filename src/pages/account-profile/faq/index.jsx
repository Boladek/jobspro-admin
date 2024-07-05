import { SearchComponent } from "../../../component/search-component";
import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import { generateArray } from "../../../helpers/function";
import { FAQWrapper } from "./faq-wrapper";

export function FAQSection() {
	const { openFaq, handleCloseFaq } = UseModal();
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
