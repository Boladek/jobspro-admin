import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { UseFinancialContext } from "../../../../../context/financial-statement-context";

export function FinancialStatement() {
    const {} = UseFinancialContext()
	return (
		<div className="border border-adminPrimary rounded-md p-4">
			<div className="flex gap-4">
				<div className="text-adminPrimary">
					<div className="flex items-center gap-2">
						<div className="text-xl/3 font-bold">Jobs Pro</div>
						<div className="w-14">
							<ProgressBar color="#0FFF9A" thickness={1.2} />
						</div>
					</div>
					<div className="text-2xl font-extralight">Financial Statement</div>
				</div>
				<div className="flex-1 border">

                </div>
			</div>
		</div>
	);
}
