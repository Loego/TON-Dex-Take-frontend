import { Link } from "react-router-dom";
import MainPanel from "./MainPanel";
import ExchangeHeader from "./ExchangeHeader";

export const Exchange = () => {
  return (
    <div className="py-2">
      <div className="px-3 gap-4 flex py-5 items-center">
        <Link to="/swap" className=" text-btn_color hover:text-white text-lg">
          Swap
        </Link>
        /
        <Link
          to="/liquidity"
          className="text-btn_color hover:text-white text-lg"
        >
          Liquidity
        </Link>
      </div>
      <ExchangeHeader />
      <MainPanel />
    </div>
  );
};
