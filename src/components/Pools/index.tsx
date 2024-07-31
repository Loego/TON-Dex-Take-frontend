import { useState } from "react";
import List from "../LiquidityPanel/List";
import {
  panel as changePanel,
  selectLiquidity,
} from "../../redux/reducers/liquidity";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { connect, selectAccount } from "../../redux/reducers/account";
import AddLiquidityPanel from "../AddLiquidityPanel";

const Pools = () => {
  const dispatch = useAppDispatch();
  const { panel } = useAppSelector(selectLiquidity);

  const accountState = useAppSelector(selectAccount);
  const connected =
    accountState.walletAddress != null && accountState.walletAddress != "";
  const [filterDate, setFilterDate] = useState<"1D" | "1W" | "1M" | "All">(
    "1D"
  );

  const filterButton = (filter: "1D" | "1W" | "1M" | "All") => {
    setFilterDate(filter);
  };

  const toggleAddLiquidityTab = () => {
    if (panel === "add") {
      dispatch(changePanel("main"));
    } else {
      dispatch(changePanel("add"));
    }
  };

  const data = [
    { id: null },
    { pool: null },
    { tvl: null },
    { volume24H: null },
    { fees24H: null },
    { apr: null },
    // Add more data as needed
  ];

  console.log(panel);
  return (
    <div className="">
      {/* <div className="max-w-[1100px] bg-[#fff]/80 dark:bg-[#111111]/80 flex flex-col mx-auto rounded-xl mt-12 shadow-light dark:shadow-dark border border-[#BFD9FF] dark:border-[#646464] backdrop-blur-xl">
        <div className="px-6 py-8 flex flex-col gap-3">
          <div className="dark:text-[#ECECEC] text-[#565656] text-[18px] font-semibold">
            Pools
          </div>
          <label className="relative rounded-[20px] border border-[#BFD9FF] dark:border-[#646464] dark:bg-white/40 dark:bg-blend-overlay backdrop-blur-xl py-3 px-6">
            <input
              type="string"
              placeholder="Search Pools"
              className="text-base text-[#666] dark:text-[#E4E4E4] leading-normal font-normal"
            />
          </label>
        </div>
      </div> */}
      <div className="mt-16 max-w-[1100px] mx-auto flex flex-col gap-4">
        {/* <div className="text-[#565656] dark:text-[#ECECEC] text-[18px] font-semibold">
          Top Pools
        </div> */}
        <div className="mt-[25px] flex flex-col-reverse md:flex-row gap-2 items-center justify-center">
          {/* <div className="items-center border dark:border-[#646464] border-[#06A5FF] px-2 py-2 rounded-2xl gap-2 flex flex-row bg-[#ffffff]/80 dark:bg-[#111111]/80">
            {["1D", "1W", "1M", "All"].map((filter) => (
              <div
                key={filter}
                className={`flex ${
                  filterDate === filter
                    ? "border-[#BFD9FF] dark:border-[#353535] bg-[#E3F2FF] dark:bg-[#1A1A1A] rounded-xl border"
                    : ""
                } backdrop-blur-xl py-2 px-3 text-[#565656] dark:text-[#ECECEC] text-[14px] cursor-pointer`}
                onClick={() =>
                  filterButton(filter as "1D" | "1W" | "1M" | "All")
                }
              >
                {filter}
              </div>
            ))}
          </div> */}
          <div className="items-center border dark:border-[#646464] border-[#06A5FF] px-2 py-2 rounded-2xl gap-2 flex flex-row bg-[#ffffff]/80 dark:bg-[#111111]/80">
            <button
              className="px-[9px] py-2 w-fit rounded-xl border border-[#BFD9FF] dark:border-[#353535] bg-[#F3F8FF] dark:bg-[#242424] backdrop-blur-xl text-[#565656] dark:text-[#ECECEC] text-base font-normal leading-[20px] opacity-50 pointer-events-none"
              disabled
            >
              Boost a pool
            </button>
            <button
              className="px-[9px] py-2 w-fit rounded-xl border border-[#BFD9FF] dark:border-[#353535] bg-[#1f93d6] backdrop-blur-xl text-[#fff]  text-base font-normal leading-[20px]"
              onClick={toggleAddLiquidityTab}
            >
              {panel === "add" ? "Go to List" : "+ Add Liquidity"}
            </button>
          </div>
        </div>
        {panel === "main" && (
          <div className="px-6 pt-4 pb-4 rounded-2xl w-full border border-[#BFD9FF] dark:border-[#646464] shadow-light dark:shadow-dark bg-[#fff]/80 dark:bg-[#111111]/80 backdrop-blur-xl">
            {/* <table className="w-full">
              <thead className="w-full">
                <tr>
                  <th className="!w-[30px] text-start text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                    #
                  </th>
                  <th className="ml-[13.5px] w-[30%] text-start text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                    Pool
                  </th>
                  <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                    TVL
                  </th>
                  <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                    Volume 24H
                  </th>
                  <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                    Fees 24H
                  </th>
                  <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                    APR
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item?.id}>
                    <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                      {item?.id}
                    </td>
                    <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                      {item?.pool}
                    </td>
                    <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                      {item?.tvl}
                    </td>
                    <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                      {item?.volume24H}
                    </td>
                    <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                      {item?.fees24H}
                    </td>
                    <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                      {item?.apr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full py-[19.5px] justify-center items-center gap-4 text-center">
              <div className=""></div>
              <div className="text-[#565656] dark:text-[#ECECEC] text-base font-medium leading-normal">
                Page 1 of 1
              </div>
              <div className=""></div>
            </div> */}
            <List />
          </div>
        )}
        {panel === "add" && <AddLiquidityPanel />}
      </div>
    </div>
  );
};

export default Pools;
