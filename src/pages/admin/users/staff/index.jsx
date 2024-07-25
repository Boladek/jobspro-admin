import { FinancialStatementProvider } from "../../../../context/financial-statement-context";
import { FinancialStatement } from "./financial-statement";

export function Staff() {
	return (
		<div>
			<FinancialStatementProvider>
				<FinancialStatement />
			</FinancialStatementProvider>
		</div>
	);
}
