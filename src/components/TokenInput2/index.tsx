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
    <div className="bg-[#f3f8ff] dark:bg-[#242424] border border-[#BFD9FF] dark:border-[#353535] rounded-xl min-h-[99px] flex flex-col flex-nowrap pt-4 p-4 gap-3">
      <div className="flex flex-row justify-between items-center pr-1 pb-1 gap-2">
        <div
          className="cursor-pointer px-2.5 py-1.5 flex flex-row items-center gap-2.5 rounded-lg border border-[#BFD9FF] dark:border-[#353535] bg-[#fff] dark:bg-[#353535] bg-blend-overlay backdrop-blur-xl min-w-max"
          onClick={onSelectToken}
        >
          {token !== null ? (
            <img
              src={token?.logoURI}
              alt={token.name}
              className="w-[21px] rounded-full"
            ></img>
          ) : null}
          <div className="flex flex-row gap-[10px]">
            <div className=" text-[#0C192B] dark:text-[#ECECEC] text-xs font-semibold leading-[1rem] whitespace-nowrap">
              {token !== null ? token.symbol : "Select Token"}
            </div>
          </div>
        </div>
        <input
          className="text-3xl font-bold dark:text-[#ECECEC]/80 text-right text-[#212121]/80 justify-end "
          placeholder="0.00"
          value={`${value}`}
          onChange={handleChange}
          type="number"
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="text-[#565656] dark:text-[#ECECEC] font-normal text-xs">
            Balance:
          </div>
          <div className="text-[#565656] dark:text-[#ECECEC] font-semibold text-xs pl-4">
            {token?.balance ?? 0}&nbsp;{token !== null ? token.symbol : ""}
          </div>
          {showMax && token?.balance ? (
            <div
              onClick={handleMaxClick}
              className="pl-2 text-[#565656] dark:text-[#ECECEC] font-normal text-xs"
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
