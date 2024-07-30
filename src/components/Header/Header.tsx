import React, { useEffect } from "react";
import logo from "../../assets/img/logo.gif";
import dark from "../../assets/dark.svg";
import light from "../../assets/light.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import { useTonConnect } from "../../hook/useTonConnect";
import { useAppDispatch } from "../../redux/hooks";
import { connect } from "../../redux/reducers/account";
import { retrieveTokens } from "../../redux/reducers/tokens";
import { useTonClient } from "../../hook/useTonClient";
import { Address, fromNano } from "@ton/core";

interface NavbarProps {
  toggleMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<NavbarProps> = ({ toggleMode, isDarkMode }) => {
  const navigate = useNavigate();
  const navigatorButton = (path: string) => {
    navigate(`/${path}`);
  };
  const dispatch = useAppDispatch();

  const client = useTonClient();

  const { address, connected } = useTonConnect();

  useEffect(() => {
    const fetchTokens = async () => {
      if (address && client) {
        const balance = await client.getBalance(Address.parse(address));
        dispatch(
          retrieveTokens({
            walletAddress: address,
            balance: Number(fromNano(balance)),
          })
        );
      }
    };

    if (connected && address && client) {
      dispatch(connect(address));

      fetchTokens();
    }
  }, [address, connected, client]);
  return (
    <nav className="w-full z-[100] py-2 px-6 md:px-20 grid grid-cols-[auto_auto] md:grid-cols-[1fr_auto_1fr] gap-5 bg-[#ffffffcc] dark:bg-[#111111CC] backdrop-blur-sm">
      <div className="flex justify-between items-center md:w-auto">
        <div className="cursor-pointer" onClick={() => navigatorButton("/")}>
          <img
            src={logo}
            alt="Logo"
            className="w-14 aspect-square scale-125 hue-rotate-90"
          />
        </div>
      </div>
      <ul className="md:flex md:items-center md:gap-10 hidden absolute md:static top-full left-0 w-full md:w-auto transition-transform transform md:transform-none duration-300">
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
      <div className="flex justify-end items-center gap-4">
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
        <TonConnectButton />
      </div>
    </nav>
  );
};

export default Header;
