import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Exchange } from "./components/Exchange/Exchange";
import { LandingPage } from "./components/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import { config } from "dotenv";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { retrieveTokens } from "./redux/reducers/tokens";
import { selectAccount } from "./redux/reducers/account";
import Modals from "./components/Modals";
import { SwapPanel } from "./components/Exchange/SwapPanel";
import LiquidityPage from "./components/LiquidityPage";
import Staking from "./components/Stake";
config();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { walletAddress } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  console.log("wallet_address;", isDarkMode);

  useEffect(() => {
    const fetchTokens = async () => {
      const tokens = await retrieveTokens(walletAddress);
      dispatch(tokens);
    };
    fetchTokens();
  }, [dispatch, walletAddress]);

  return (
    <>
      <div className={`${isDarkMode ? "dark" : ""} h-screen w-full`}>
        <Header toggleMode={toggleMode} isDarkMode={isDarkMode} />
        <div className="main min-h-full pt-20 w-full bg-light-mode dark:bg-dark-mode bg-no-repeat bg-center bg-cover">
          <div className="pb-10">
            <Routes>
              {/* <Route path="/" element={<LandingPage />} /> */}
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/swap" element={<SwapPanel />} />
              <Route path="/liquidity" element={<LiquidityPage />} />
              <Route path="/stake" element={<Staking />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </div>
          <Modals />
        </div>
        <div>
          <ul>
            <ul
              className={`md:hidden items-center md:gap-10 flex justify-center absolute right-0 bottom-0 left-0 w-full md:w-auto bg-white dark:bg-gray-800 md:bg-opacity-0 dark:md:bg-opacity-0 transition-transform transform md:transform-none duration-300`}
            >
              <li className="text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0">
                Swap
              </li>
              <li className="text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0">
                Pools
              </li>
              <li className="text-lg font-semibold text-[#06A5FF] py-2 md:py-0 px-6 md:px-0">
                Stake
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
