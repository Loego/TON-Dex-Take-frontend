import React from "react";
import logo from "../../assets/logo.svg";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";
import wallet from "../../assets/wallet.svg";
import { TonConnectButton } from "@tonconnect/ui-react";

interface NavbarProps {
  toggleMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<NavbarProps> = ({ toggleMode, isDarkMode }) => {
  console.log("Dark Mode", isDarkMode);
  return (
    <nav className="absolute top-0 w-full z-[1000] py-4 px-6 md:px-40 flex justify-between bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90">
      <div className="flex justify-between items-center w-full md:w-auto">
        <a href={"/"}>
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <ul
        className={`md:flex md:items-center md:gap-10 hidden absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-opacity-0 dark:md:bg-opacity-0 transition-transform transform md:transform-none duration-300`}
      >
        <li className="text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0">
          <a href={"/swap"} className="!text-[#06A5FF]">
            Swap
          </a>
        </li>
        <li className="text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0">
          <a href={"/liquidity"} className="!text-[#06A5FF]">
            Pools
          </a>
        </li>
        <li className="text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0">
          <a href={"/stake"} className="!text-[#06A5FF]">
            Stake
          </a>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div
          onClick={toggleMode}
          className="bg-transparent border-none text-lg cursor-pointer dark:text-white"
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
