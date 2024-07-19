import { useState } from "react";
import List from "../LiquidityPanel/List";

const Pools = () => {
  const [filterDate, setFilterDate] = useState<"1D" | "1W" | "1M" | "All">(
    "1D"
  );

  const filterButton = (filter: "1D" | "1W" | "1M" | "All") => {
    setFilterDate(filter);
  };

  return (
    <div className="px-10">
      <div className="max-w-[1100px] bg-[#fff]/80 dark:bg-[#111111]/80 flex flex-col mx-auto rounded-[12px] mt-[54px] shadow-light dark:shadow-dark border border-[#BFD9FF] dark:border-[#646464] backdrop:blur-[25px] backdrop-blur-[25px]">
        <div className="pt-[35px] pb-[46px] px-[25px] flex flex-col gap-[13px]">
          <div className="dark:text-[#ECECEC] text-[#565656] text-[18px] font-semibold">
            Pools
          </div>
          <div className="relative rounded-[20px] border border-[#BFD9FF] dark:border-[#646464] dark:bg-white/40 dark:bg-blend-overlay backdrop-blur-[25px] py-[19.25px] pl-4 pr-[46.65px]">
            <input
              type="string"
              placeholder="Search Pools"
              className="text-[16px] text-[#666] dark:text-[#E4E4E4] leading-normal font-normal"
            />
            <img src=""></img>
          </div>
        </div>
      </div>
      <div className="mt-[60px] max-w-[1100px] mx-auto flex flex-col ">
        <div className="text-[#565656] dark:text-[#ECECEC] text-[18px] font-semibold">
          Top Pools
        </div>
        <div className="mt-[25px] flex flex-row md:justify-between items-center justify-center">
          <div className="rounded-[16px] p-[5px] justify-center items-start border dark:border-[#646464] border-[#06A5FF] w-fit md:flex hidden flex-row bg-[#ffffff]/80 dark:bg-[#111111]/80">
            {["1D", "1W", "1M", "All"].map((filter) => (
              <div
                key={filter}
                className={`flex ${
                  filterDate === filter
                    ? "border-[#BFD9FF] dark:border-[#353535] bg-[#E3F2FF] dark:bg-[#1A1A1A] rounded-[12px] border"
                    : ""
                } backdrop:blur-[25px] py-2 px-3 text-[#565656] dark:text-[#ECECEC] text-[14px] cursor-pointer`}
                onClick={() =>
                  filterButton(filter as "1D" | "1W" | "1M" | "All")
                }
              >
                {filter}
              </div>
            ))}
          </div>
          <div className="items-center border dark:border-[#646464] border-[#06A5FF] py-[5px] pl-[5px] pr-[15px] rounded-[16px] gap-[15px] flex flex-row bg-[#ffffff]/80 dark:bg-[#111111]/80">
            <div className="px-[9px] py-2 w-fit rounded-[12px] border border-[#BFD9FF] dark:border-[#353535] bg-[#F3F8FF] dark:bg-[#242424] backdrop:blur-[25px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-normal leading-[20px]">
              Boost a pool
            </div>
            <div className="font-semibold text-[16px] text-[#0364F6] dark:text-[#B5D83F] leading-[20px] tracking-[-0.16px] underline cursor-pointer">
              Connect wallet
            </div>
          </div>
        </div>
        <div className="px-[25px] pt-4 mt-[17px] pb-4 rounded-[16px] w-full border border-[#BFD9FF] dark:border-[#646464] shadow-light dark:shadow-dark bg-[#fff]/80 dark:bg-[#111111]/80 backdrop:blur-[25px]">
          <table className="w-full">
            <thead className="w-full">
              <th className="!w-[30px] text-start text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                #
              </th>
              <th className="ml-[13.5px] w-[30%] text-start text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                Pool
              </th>
              <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                TVL
              </th>
              <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                Volume 24H
              </th>
              <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                Fees 24H
              </th>
              <th className="w-[15%] text-start text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal pb-[15px] border-b dark:border-[#646464] border-[#BFD9FF]">
                APR
              </th>
            </thead>
            <tbody>
              <tr>
                {/* <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                  1
                </td>
                <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                  $413.40m
                </td>
                <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                  $413.40m
                </td>
                <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                  $413.40m
                </td>
                <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                  $413.40m
                </td>
                <td className="py-[19px] text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal border-b border-[#BFD9FF] dark:border-[#646464]">
                  74.21%
                </td> */}
              </tr>
            </tbody>
          </table>
          <div className="w-full py-[19.5px] justify-center items-center gap-[15px] text-center">
            <div className=""></div>
            <div className="text-[#565656] dark:text-[#ECECEC] text-[16px] font-medium leading-normal">
              Page 1 of 6
            </div>
            <div className=""></div>
          </div>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Pools;
