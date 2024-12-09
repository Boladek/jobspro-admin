import { FinancialStatementProvider } from "../../context/financial-statement-context";
import { FinancialStatement } from "../admin/users/staff/financial-statement";
import { FeesAndCommissionsPage } from "./fees-and-commissions";

export const financialsRoutes = [
  {
    index: true,
    element: <FeesAndCommissionsPage />,
    // element: <DashboardPage />,
  },
  {
    path: "payment-module",
    element: <div>Fess and commissions</div>,
  },
  {
    path: "transactions",
    element: <div>Fess and commissions</div>,
  },
  {
    path: "reports",
    element: (
      <FinancialStatementProvider>
        <FinancialStatement />
      </FinancialStatementProvider>
    ),
  },
];
