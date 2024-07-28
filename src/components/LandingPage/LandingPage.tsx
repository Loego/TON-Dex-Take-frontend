import { useNavigate } from "react-router-dom";
import pool from "../../assets/pools.svg";
import stake from "../../assets/stake.svg";
import swap from "../../assets/swap.svg";

export const LandingPage = () => {
  const navigate = useNavigate();
  const navigatorButton = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div className="pt-0 md:pt-24 flex justify-center h-full w-full">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 md:gap-6">
        <div
          className="h-[150px] w-[350px] rounded-[12px] relative flex justify-between bg-white dark:bg-[#111111CC] border-[1px] dark:border-[#353535] border-[#BFD9FF] shadow-light dark:shadow-dark cursor-pointer"
          onClick={() => navigatorButton("swap")}
        >
          <h2 className="text-[#06A5FF] font-semibold text-[28px] pt-4 pl-6">
            Swap
          </h2>
          <div className="absolute bottom-0 right-2">
            <img src={swap} alt="" />
          </div>
        </div>
        <div
          className="h-[150px] w-[350px] rounded-[12px] relative flex justify-between bg-white dark:bg-[#111111CC] border-[1px] dark:border-[#353535] border-[#BFD9FF] shadow-light dark:shadow-dark cursor-pointer"
          onClick={() => navigatorButton("liquidity")}
        >
          <h2 className="text-[#06A5FF] font-semibold text-[28px] pt-4 pl-6">
            Pools
          </h2>
          <div className="absolute bottom-0 right-2">
            <img src={pool} alt="" />
          </div>
        </div>
        <div
          className="h-[150px] w-[350px] rounded-[12px] relative flex justify-between bg-white dark:bg-[#111111CC] border-[1px] dark:border-[#353535] border-[#BFD9FF] shadow-light dark:shadow-dark cursor-pointer"
          onClick={() => navigatorButton("stake")}
        >
          <h2 className="text-[#06A5FF] font-semibold text-[28px] pt-4 pl-6">
            Stake
          </h2>
          <div className="absolute bottom-0 right-2">
            <img src={stake} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
