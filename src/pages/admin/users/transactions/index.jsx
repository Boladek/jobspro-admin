import jobsBg from "../../../../assets/admin/jobs-stats-bg.png";
import businessStats from "../../../../assets/admin/business-stats-bg.png";
import { formatNumber } from "../../../../helpers/function";
import { ProgressBar } from "../../../../component/admin/progress-bar";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { NoInfo } from "../../../../component/no-info";
import { UseUserDetails } from "../admin-user-details-page";

export function Transactions() {
  const { transactions, gettingTransactionsStats, walletStats } =
    UseUserDetails();

  return (
    <div className="py-4 pr-4">
      <div className="flex gap-4 overflow-auto">
        <div className="flex-1 min-w-[300px]">
          <div
            className="bg-cover bg-center h-[120px] p-4 rounded-xl text-white min-w-56"
            style={{
              backgroundImage: `url(${jobsBg})`,
              backgroundColor: "#0030DC",
            }}
          >
            <div className="flex items-center h-1/2 justify-between">
              <div>
                <p className="font-bold text-xs">Wallet</p>
                <p className="font-extralight text-sm">Balance</p>
              </div>
              <div className="flex items-center gap-1">
                <span>NGN</span>
                <p className="text-2xl font-bold">
                  {formatNumber(walletStats.walletAmount, 2)}
                </p>
              </div>
            </div>
            <div className="flex items-center h-1/2 justify-between pt-6">
              <div className="w-24">
                <ProgressBar percent={100} color="#00DE74" thickness={1.5} />
              </div>
              <div className="flex items-center gap-2 text-[9px]">
                <span className="font-light">Today</span>
                <span className="py-0.5 px-2 bg-white rounded-full text-primary font-bold">
                  {formatNumber(walletStats.percentageWalletChange, 2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[300px]">
          <div
            className="bg-cover bg-center h-[120px] p-4 rounded-xl text-white min-w-56"
            style={{
              backgroundImage: `url(${businessStats})`,
              backgroundColor: "#0030DC",
            }}
          >
            <div className="flex items-center h-1/2 justify-between">
              <div>
                <p className="font-bold text-xs">Withdrawal</p>
                <p className="font-extralight text-sm">Total</p>
              </div>
              <div className="flex items-center gap-1">
                <span>NGN</span>
                <p className="text-2xl font-bold">
                  {formatNumber(walletStats?.totalWithdrawalAmount, 2)}
                </p>
              </div>
            </div>
            <div className="flex items-center h-1/2 justify-between pt-6">
              <div className="w-24">
                <ProgressBar percent={100} color="#FFDE16" thickness={1.5} />
              </div>
              <div className="flex items-center gap-2 text-[9px]">
                <span className="font-light">Today</span>
                <span className="py-0.5 px-2 bg-white rounded-full text-primary font-bold">
                  {formatNumber(
                    walletStats.percentageWithdrawalAmountChange,
                    2
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 pt-4">
        {gettingTransactionsStats ? (
          <p>Please wait... </p>
        ) : transactions.length > 0 ? (
          transactions.map((gig, index) => (
            <div
              key={Math.random()}
              className={`flex gap-4 justify-between p-2 hover:bg-gray-100 cursor-pointer items-center`}
            >
              <div
                className={`text-xl p-3 rounded-full ${
                  index % 2 === 0 ? "bg-[#E8FFCC]" : "bg-[#FFF8CD]"
                }`}
              >
                {index % 2 === 0 ? (
                  <FaArrowCircleLeft className="text-[#57FFAE]" />
                ) : (
                  <FaArrowCircleRight className="text-[#FFDE16]" />
                )}
              </div>
              <div className="w-1/4">
                <p className="text-tiny">Job</p>
                <div className="text-sm">Plumbing fixing</div>
              </div>
              <div className="flex-1">
                <p className="text-tiny">Transferred by</p>
                <div className="text-sm">Finclusion Ng</div>
              </div>
              <div className="flex-1">
                <p className="text-tiny">Reference</p>
                <div className="text-sm">6953144823456879</div>
              </div>
              <div className="flex-1">
                <p className="text-tiny">Amount</p>
                <div>
                  <span className="text-tiny">NGN</span>{" "}
                  <span className="text-sm font-bold text-gray-500">
                    {formatNumber(20000)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-16">
            <NoInfo message="No Transaction information available" />
          </div>
        )}
      </div>
    </div>
  );
}
