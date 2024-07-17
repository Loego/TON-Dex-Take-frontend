import { Link } from "react-router-dom";
import pool from "../../assets/pools.svg";
import stake from "../../assets/stake.svg";
import swap from "../../assets/swap.svg";

export const LandingPage = () => {
  return (
    <div className="flex justify-center md:pt-40 pt-10 md:pb-0 pb-24 items-center h-full w-full">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <Link
          className="h-[150px] w-[350px] rounded-[12px] relative flex justify-between bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90"
          to={"/swap"}
        >
          <h2 className="text-[#06A5FF] font-semibold text-[28px] pt-4 pl-6">
            Swap
          </h2>
          <div className="absolute bottom-0 right-2">
            <img src={swap} alt="" />
          </div>
        </Link>
        <Link
          to="/liquidity"
          className="h-[150px] w-[350px] rounded-[12px] relative flex justify-between bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90"
        >
          <h2 className="text-[#06A5FF] font-semibold text-[28px] pt-4 pl-6">
            Pools
          </h2>
          <div className="absolute bottom-0 right-2">
            <img src={pool} alt="" />
          </div>
        </Link>
        <Link
          to="/stake"
          className="h-[150px] w-[350px] rounded-[12px] relative flex justify-between bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90"
        >
          <h2 className="text-[#06A5FF] font-semibold text-[28px] pt-4 pl-6">
            Stake
          </h2>
          <div className="absolute bottom-0 right-2">
            <img src={stake} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};
