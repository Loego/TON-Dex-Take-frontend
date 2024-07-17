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
      <footer
        className={` items-center md:gap-10 flex justify-center absolute right-0 md:bottom-6 bottom-14 left-0 w-full md:w-auto  transition-transform transform md:transform-none duration-300`}
      >
        <ul className="flex items-center gap-10 ">
          <li className="text-lg font-semibold text-[#06A5FF]">Twitter</li>
          <li className="text-lg font-semibold text-[#06A5FF]">Telegram</li>
          <li className="text-lg font-semibold text-[#06A5FF]">Listing</li>
          <li className="text-lg font-semibold text-[#06A5FF]">Github</li>
          <li className="text-lg font-semibold text-[#06A5FF]">Docs</li>
        </ul>
      </footer>
    </div>
  );
};
