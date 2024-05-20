import "./App.css";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Exchange } from "./components/Exchange/Exchange";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { config } from "dotenv";
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { retrieveTokens } from "./redux/reducers/tokens";z
import { selectAccount } from "./redux/reducers/account";
import Modals from "./components/Modals";
import { SwapPanel } from "./components/Exchange/SwapPanel";
import LiquidityPage from "./components/LiquidityPage";
config();

function App() {
  const { walletAddress } = useAppSelector(selectAccount);
  console.log("wallet_address;", walletAddress);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTokens = async () => {
      const tokens = await retrieveTokens(walletAddress);
      dispatch(tokens);
    };
    fetchTokens();
  }, [dispatch, walletAddress]);

  return (
    <div>
      <TonConnectUIProvider
        manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
        uiPreferences={{ theme: THEME.DARK }}
        walletsListConfiguration={{
          includeWallets: [
            {
              appName: "safepalwallet",
              name: "SafePal",
              imageUrl:
                "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
              aboutUrl: "https://www.safepal.com/download",
              jsBridgeKey: "safepalwallet",
              platforms: ["ios", "android", "chrome", "firefox"],
            },
            {
              appName: "tonwallet",
              name: "TON Wallet",
              imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
              aboutUrl:
                "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
              universalLink: "https://wallet.ton.org/ton-connect",
              jsBridgeKey: "tonwallet",
              bridgeUrl: "https://bridge.tonapi.io/bridge",
              platforms: ["chrome", "android"],
            },
          ],
        }}
        actionsConfiguration={{
          twaReturnUrl: "https://t.me/tc_twa_demo_bot/start",
        }}
      >
        <div className="App">
          <Header />
          <div className="bg-dark pt-20 h-full w-full">
            <Switch>
              <Route exact path="/" component={LandingPage} />
            </Switch>
            <Switch>
              <Route path="/exchange" component={Exchange} />
            </Switch>
            <Switch>
              <Route path="/swap" component={SwapPanel} />
            </Switch>
            <Switch>
              <Route path="/liquidity" component={LiquidityPage} />
            </Switch>
            <Modals />
            <Footer />
          </div>
        </div>
      </TonConnectUIProvider>
    </div>
  );
}

export default App;
