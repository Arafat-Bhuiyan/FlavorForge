import userRedIcon from "../../assets/images/user-red-icon.png";
import growRedIcon from "../../assets/images/grow-red-icon.png";
import RevenueChart from "./RevenueChart";
import RecentUsers from "./RecentUsers";
import TopIngredients from "./TopIngredients";

export const StartCards = () => {
  return (
    <div className="col-span-8">
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Users */}
        <div className="flex items-center  gap-5 py-6 px-10 bg-[#FFFDFD] border border-[#E4572E] rounded-xl shadow-lg">
          <img src={userRedIcon} className="w-16 h-16" alt="" />
          <div className="flex flex-col gap-3">
            <p className="text-[#2E2E2E] font-semibold text-5xl">345</p>
            <p className="text-[#2E2E2E] font-normal text-xl">Total Users</p>
            <div className="flex items-center gap-1">
              <img src={growRedIcon} alt="" />
              <p className="text-[#A3A3A3] font-normal text-xs">4% (30 days)</p>
            </div>
          </div>
        </div>
        {/* Active Subscription */}
        <div className="flex items-center  gap-5 py-6 px-10 bg-[#FFFDFD] border border-[#E4572E] rounded-xl shadow-lg">
          <img src={userRedIcon} className="w-16 h-16" alt="" />
          <div className="flex flex-col gap-3">
            <p className="text-[#2E2E2E] font-semibold text-5xl">245</p>
            <p className="text-[#2E2E2E] font-normal text-xl">
              Active Subscription
            </p>
            <div className="flex items-center gap-1">
              <img src={growRedIcon} alt="" />
              <p className="text-[#A3A3A3] font-normal text-xs">4% (20 days)</p>
            </div>
          </div>
        </div>
        {/* Users */}
        <div className="flex items-center  gap-5 py-6 px-10 bg-[#FFFDFD] border border-[#E4572E] rounded-xl shadow-lg">
          <img src={userRedIcon} className="w-16 h-16" alt="" />
          <div className="flex flex-col gap-3">
            <p className="text-[#2E2E2E] font-semibold text-5xl">1250</p>
            <p className="text-[#2E2E2E] font-normal text-xl">
              AI Requests Today
            </p>
            <div className="flex items-center gap-1">
              <img src={growRedIcon} alt="" />
              <p className="text-[#A3A3A3] font-normal text-xs">4% (25 days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart, Table, Ingredients */}
      <div className="grid grid-cols-1 gap-6">
        {/* Chart */}
        <RevenueChart />

        {/* Table, Ingredients  */}
        <div className="w-full flex items-stretch gap-6">
          <div className="w-2/3">
            <RecentUsers />
          </div>
          <div className="w-1/3">
            <TopIngredients />
          </div>
        </div>
      </div>
    </div>
  );
};
