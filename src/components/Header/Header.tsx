import React from "react";
import logo from "../../assets/logo.svg";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<NavbarProps> = ({ toggleMode, isDarkMode }) => {
  const navigate = useNavigate();
  const navigatorButton = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <nav className="absolute top-0 w-full z-[1000] py-4 px-6 md:px-40 flex justify-between bg-[#ffffffcc] dark:bg-[#111111CC]">
      <div className="flex justify-between items-center w-full md:w-auto">
        <div onClick={() => navigatorButton("/")}>
          <img src={logo} alt="Logo" className="w-7 md:w-[38px]" />
        </div>
      </div>
      <ul
        className={`md:flex md:items-center md:gap-10 hidden absolute md:static top-full left-0 w-full md:w-auto transition-transform transform md:transform-none duration-300`}
      >
        <li
          onClick={() => navigatorButton("swap")}
          className="cursor-pointer text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0"
        >
          Swap
        </li>
        <li
          onClick={() => navigatorButton("liquidity")}
          className="cursor-pointer text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0"
        >
          Pools
        </li>
        <li
          onClick={() => navigatorButton("stake")}
          className="cursor-pointer text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0"
        >
          Stake
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div
          onClick={toggleMode}
          className="min-w-5 bg-transparent border-none text-lg cursor-pointer dark:text-white/80"
        >
          <img
            src={`${isDarkMode ? dark : light}`}
            alt="Mode"
            className="w-5 h-5"
          />
        </div>
        {/* <button className="flex items-center justify-center gap-3 bg-gradient-to-tr from-[#025DE7] to-[#0366FC] h-[56px] w-[200px] rounded-[12px] text-white">
          <img src={wallet} alt="Wallet" />
          Connect Wallet
        </button> */}
        <TonConnectButton />
      </div>
    </nav>
  );
};

export default Header;
