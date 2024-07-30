import { useNavigate } from "react-router-dom";

const AppFooter = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-[57px] md:hidden items-center md:gap-10 flex justify-center right-0 bottom-0 left-0 w-full md:w-auto bg-white dark:invert md:bg-opacity-0  transition-transform transform md:transform-none duration-300 px-4 py-2.5">
        <div
          onClick={() => navigate("/swap")}
          className="w-1/3 h-full flex flex-row items-center justify-center text-center px-6 md:px-0 gap-[9px] cursor-pointer hover:border-t-2 hover:border-[#06A5FF]"
        >
          <img className="w-6 h-6" src="/assets/img/swap.png" alt="swapImg" />
          <div className="text-xs leading-[150%] font-semibold text-black">
            Swap
          </div>
        </div>
        <div
          onClick={() => navigate("/liquidity")}
          className="w-1/3 h-full flex flex-row items-center justify-center text-center px-6 md:px-0 gap-[9px] cursor-pointer hover:border-t-2 hover:border-[#06A5FF]"
        >
          <img className="w-6 h-6" src="/assets/img/pools.png" alt="poolsImg" />
          <div className="text-xs leading-[150%] font-semibold text-black">
            Pools
          </div>
        </div>
        <div
          onClick={() => navigate("/stake")}
          className="w-1/3 h-full flex flex-row items-center justify-center text-center px-6 md:px-0 gap-[9px] cursor-pointer hover:border-t-2 hover:border-[#06A5FF]"
        >
          <img className="w-6 h-6" src="/assets/img/stake.png" alt="stakeImg" />
          <div className="text-xs leading-[150%] font-semibold text-black">
            Stake
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
