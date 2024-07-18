import React from "react";
import { TokenBalanced } from "../../redux/types/tokens";

interface IProps {
  value: number;
  token: TokenBalanced | null;
  onChange?: (value: number) => void;
  onSelectToken?: () => void;
  showMax?: boolean;
}

export default function TokenInput({
  onChange,
  value,
  token,
  onSelectToken,
  showMax,
}: IProps) {
  // we can get changed values when the users input number
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!!onChange && value.match(/^\d*(\.\d+)?$/g)) {
      const returnValue = parseFloat(value);
      onChange(Number.isNaN(returnValue) ? 0 : returnValue);
    }
  };

  const handleMaxClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (onChange && token?.balance) {
      onChange(token.balance);
    }
  };

  return (
    <div className="bg-[#f3f8ff] dark:bg-[#242424] border border-[#BFD9FF] dark:border-[#353535] rounded-[12px] min-h-[99px] flex flex-col flex-nowrap pt-[17px] pr-[15px] pb-[16.3px] pl-[18px] gap-[13px]">
      <div className="flex flex-row justify-between items-center pr-[3px] pb-[3px]">
        <div
          className="cursor-pointer py-[6.84px] pl-[10.3px] pr-[13.7px] flex flex-row items-center gap-[10.267px] rounded-[8px] border border-[#BFD9FF] dark:border-[#353535] bg-[#fff] dark:bg-[#353535] bg-blend-overlay backdrop-blur-[25px]"
          onClick={onSelectToken}
        >
          {token !== null ? (
            <img
              src={token?.logoURI}
              alt={token.name}
              className="w-[21px]"
            ></img>
          ) : null}
          <div className="flex flex-row gap-[10px]">
            <div className=" text-[#0C192B] dark:text-[#ECECEC] text-[12px] font-semibold leading-[1rem]">
              {token !== null ? token.symbol : "Select Token"}
            </div>
            <div className=""></div>
          </div>
        </div>
        <input
          className="dark:text-[#ECECEC] text-right text-[#212121] justify-end"
          placeholder="0.00"
          value={`${value}`}
          onChange={handleChange}
          type="number"
        ></input>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="text-[#565656] dark:text-[#ECECEC] font-normal text-[12px]">
            Balance:
          </div>
          <div className="text-[#565656] dark:text-[#ECECEC] font-semibold text-[12px] pl-[17px]">
            {token?.balance ?? 0}&nbsp;{token !== null ? token.symbol : ""}
          </div>
          {showMax && token?.balance ? (
            <div
              onClick={handleMaxClick}
              className="pl-2 text-[#565656] dark:text-[#ECECEC] font-normal text-[12px]"
            >
              MAX
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
