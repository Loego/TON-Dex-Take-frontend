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
import Footer from "./components/Footer/Footer";
import AppFooter from "./components/Footer/AppFooter";
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
      <div className={`${isDarkMode ? "dark" : ""} h-screen w-full relative`}>
        <Header toggleMode={toggleMode} isDarkMode={isDarkMode} />
        <div className="main min-h-screen pt-[67px] w-full bg-light-mode dark:bg-dark-mode bg-no-repeat bg-center bg-cover">
          <div className="min-h-[calc(100vh-145px)] pb-12">
            <Routes>
              {/* <Route path="/" element={<LandingPage />} /> */}
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/swap" element={<SwapPanel />} />
              <Route path="/liquidity" element={<LiquidityPage />} />
              <Route path="/stake" element={<Staking />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </div>
          <Footer />
          <Modals />
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default App;
