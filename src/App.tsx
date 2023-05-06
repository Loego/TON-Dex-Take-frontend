import './App.css';
import TonWeb from 'tonweb';
import { Buffer } from 'buffer';
import React, { ChangeEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter, useLocation } from "react-router-dom";

// import { Router, ROUTER_REVISION, ROUTER_REVISION_ADDRESS } from '@ston-fi/sdk';
import { Header } from "./components/Header/Header";
import { Exchange } from './components/Exchange/Exchange';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Footer } from './components/Footer/Footer';
import { LiveChat } from './components/LiveChat/LiveChat';
import { KeyPair, mnemonicToWalletKey } from 'ton-crypto';
import { base32Decode, TonClient, TupleBuilder } from 'ton';
import { config } from "dotenv"
import { TonConnectUIProvider } from '@tonconnect/ui-react';
config()


// const client = new TonClient({ endpoint: endpointUrl, apiKey: api_key });
// const balance = (await provider.getBalance(WALLET_ADDRESS))/1000000000;


// const mnemonic: string[] = import.meta.env.VITE_DEPLOYER_MNEMONIC ? import.meta.env.VITE_DEPLOYER_MNEMONIC.split(' ') : []
// const JETTON0 = import.meta.env.VITE_JETTON0 // TAN_1 token
// const JETTON1 = import.meta.env.VITE_JETTON1 // ALEX_1 token
// const provider = new TonWeb.HttpProvider(import.meta.env.VITE_endpointUrl);
// const wallet = new TonWeb(provider).wallet.create({
//   address: import.meta.env.VITE_WALLET_ADDRESS,
// });

// const router = new Router(provider, {
//   revision: ROUTER_REVISION.V1,
//   address: import.meta.env.VITE_router_address,
// });

function App() {
  // const [inputTON, setInputTON] = useState<number>();
  // const [inputALEX, setInputALEX] = useState<number>();

  // const handleTONChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = Number(event.target.value);
  //   setInputTON(value);
  // }
  // const handleALEXChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = Number(event.target.value);
  //   setInputALEX(value);
  // }

  // async function connectWallet(){
  //   const balance = await provider.getBalance(import.meta.env.VITE_WALLET_ADDRESS) / 1000000000;
  //   const div_balance = document.getElementById("div_balance");
  //   const div_address = document.getElementById("div_address");
  //   if(div_balance && div_address){
  //     div_balance.innerHTML = balance.toString() + " TON";
  //     div_address.innerHTML = import.meta.env.VITE_WALLET_ADDRESS;
  //   }
  //   console.log("TAN data: ", (await provider.getBalance(JETTON0))/1000000000);

  //   console.log("TAN data: ", (await provider.getBalance(JETTON1))/1000000000);

  // }

  // async function TokenSwap1_0() {

  //   const WALLET_SECRET = (await mnemonicToWalletKey(mnemonic) as KeyPair).secretKey;
  //   const params = await router.buildSwapJettonTxParams({
  //     userWalletAddress: import.meta.env.VITE_WALLET_ADDRESS,
  //     offerJettonAddress: JETTON1, // JETTON1
  //     askJettonAddress: JETTON0, // JETTON0
  //     offerAmount: new TonWeb.utils.BN(Number(inputALEX) * 1000000000),
  //     minAskAmount: new TonWeb.utils.BN(1000000000),
  //     queryId: new TonWeb.utils.BN(12345),
  //   });
  
  //   console.log("Next Step");
  
  //   const res1 = await wallet.methods.transfer({
  //     secretKey: WALLET_SECRET,
  //     toAddress: params.to,
  //     amount: params.gasAmount,
  //     seqno: (await wallet.methods.seqno().call()) ?? 0,
  //     payload: params.payload,
  //     sendMode: 3,
  //   }).send();
  
  //   console.log(res1);
  //   console.log("finished");
  //   alert("You can check through https://tonviewer.com/EQArx2PlFfgb5c7fUvkn-jOF1onYzYt1e9Nz41yunshgl7KH");
  // }
  // async function TokenSwap0_1() {
  //   const WALLET_ADDRESS = import.meta.env.VITE_WALLET_ADDRESS;
  //   // console.log("====>mnemonic<======",mnemonic);
  //   const WALLET_SECRET = (await mnemonicToWalletKey(mnemonic) as KeyPair).secretKey;

    // console.log("Rouer contract address: ", router.address?.toString(true, true, true));
    // console.log("Previous Step");
    // console.log((await router.getPoolAddress({token0: JETTON0, token1: JETTON1}))?.toString(true, true, true));
    // 
    // console.log("ALIX data: ", await provider.getBalance("EQCh9T3qJgmjVwlyKCo5LXgG0ooJwfLvf4ybL4GN-y006z_o"));
  // Create transaction params for swap operation
  // 0.5 JETTON0 to JETTON1 but not less than 0.1 JETTON1

  // const paramsJetton0 = await router.buildProvideLiquidityJettonTxParams({
  //   userWalletAddress: WALLET_ADDRESS,
  //   sendTokenAddress: JETTON0,
  //   otherTokenAddress: JETTON1,
  //   sendAmount: new TonWeb.utils.BN(7000000000000),
  //   minLpOut: new TonWeb.utils.BN(1),
  //   queryId: 12345,
  // });

  // const res1 = wallet.methods.transfer({
  //   secretKey: WALLET_SECRET,
  //   toAddress: paramsJetton0.to,
  //   amount: paramsJetton0.gasAmount,
  //   seqno: (await wallet.methods.seqno().call()) ?? 0,
  //   payload: paramsJetton0.payload,
  //   sendMode: 3,
  // }).send();
  // console.log("===>res1:", res1);

  
  // // Build transaction params to provide 200000000 JETTON1 to JETTON0/JETTON1 pool
  // const paramsJetton1 = await router.buildProvideLiquidityJettonTxParams({
  //   userWalletAddress: WALLET_ADDRESS,
  //   sendTokenAddress: JETTON1,
  //   otherTokenAddress: JETTON0,
  //   sendAmount: new TonWeb.utils.BN(50000000000),
  //   minLpOut: new TonWeb.utils.BN(1),
  //   queryId: 12345,
  // });

  // const res2 = wallet.methods.transfer({
  //   secretKey: WALLET_SECRET,
  //   toAddress: paramsJetton1.to,
  //   amount: paramsJetton1.gasAmount,
  //   seqno: (await wallet.methods.seqno().call()) ?? 0,
  //   payload: paramsJetton1.payload,
  //   sendMode: 3,
  // }).send();
  // console.log(res2); 

  //SWAP SECTION
  
    // const params = await router.buildSwapJettonTxParams({
    //   userWalletAddress: import.meta.env.VITE_WALLET_ADDRESS,
    //   offerJettonAddress: JETTON0, // JETTON0
    //   askJettonAddress: JETTON1, // JETTON1
    //   offerAmount: new TonWeb.utils.BN(Number(inputTON) * 1000000000),
    //   minAskAmount: new TonWeb.utils.BN(1000000000),
    //   queryId: new TonWeb.utils.BN(12345),
    // });
  
    // console.log("Next Step");
  
    // const res1 = await wallet.methods.transfer({
    //   secretKey: WALLET_SECRET,
    //   toAddress: params.to,
    //   amount: params.gasAmount,
    //   seqno: (await wallet.methods.seqno().call()) ?? 0,
    //   payload: params.payload,
    //   sendMode: 3,
    // }).send();
  
    // console.log(res1);
    // console.log("finished");

    // alert("You can check through https://tonviewer.com/EQArx2PlFfgb5c7fUvkn-jOF1onYzYt1e9Nz41yunshgl7KH");

  return (
  
    <BrowserRouter>
      <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <div className='App'>
        <Header />
        <div className='bg-dashboard_dark h-full'>
          <Switch>
            <Route exact path="/" component={ LandingPage } />
          </Switch>
          <Switch>
              <Route path = "/exchange" component={ Exchange } />
          </Switch>
        <Footer />
        </div>
        
      </div>
      </TonConnectUIProvider>
      </BrowserRouter>
    
      /* <div className='Container'>
        <a
          className={`Button `}
          onClick={() => {
            connectWallet();
          }}
        >
          Connect Wallet
        </a>

        <div className='Card'> 
          <b>Wallet Address</b>
          <div className='Hint' id="div_address"></div>
        </div>

        <div className='Card'>
          <b>Wallet balance</b>
          <div id = "div_balance"></div>
        </div>
        <div>
          <p>TON token number</p>
          <input type="number" value={inputTON} onChange={handleTONChange} />
          <a
          style={{marginTop:"30px"}}
          className={`Button `}
          onClick={() => {
            TokenSwap0_1();
          }}
          >
            Swap Token
          </a>
        </div>
        <div>
          <p>Alix token number</p>
          <input type='number' value={inputALEX} onChange={handleALEXChange} />
          <a
          style={{marginTop:"30px"}}
          className={`Button `}
          onClick={() => {
            TokenSwap1_0();
          }}
          >
            Swap Token
          </a>
        </div>
      </div> */
  );
}

export default App
