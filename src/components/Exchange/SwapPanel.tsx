import TonWeb from "tonweb";
import { useState } from 'react';
import {ArrowsUpDownIcon} from '@heroicons/react/24/outline'
import {TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress, TonConnectUI} from "@tonconnect/ui-react";
import { useEffect } from 'react';
import { Address } from 'tonweb/dist/types/utils/address';
import { showModal } from '../../redux/reducers/modals';
import { connect, selectAccount } from "../../redux/reducers/account";
import { useInputBalanceEffect } from "../../utils/hooks";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeInput, selectionModal, selectSwap, switchInputs, syncTokenBalances } from '../../redux/reducers/swap';
import Info from "../icons/Info";
import SwitchButton from '../SwitchButton/SwitchButton';
import TokenInput from '../TokenInput/TokenInput';

import './TONConnectButton.scss';

export const SwapPanel = () => {

  const accountState = useAppSelector(selectAccount);
  const swapState = useAppSelector(selectSwap);
  const dispatch = useAppDispatch();

  const connected = accountState.walletAddress !== null && accountState.walletAddress !== "";

  // const [WalletConnector] = useTonConnectUI();
  
  // if(WalletConnector.connected) WalletConnector.disconnect()

  // const userFriendlyAddress = useTonAddress()

  // console.log("connected:", connected)

  const handleSwap = () => {
    if (!connected) {
      // await WalletConnector.connectWallet();
      // if(userFriendlyAddress != "")
     //dispatch(connect(userFriendlyAddress));
     console.log("done");
    }else{
      dispatch(showModal("swap-confirmation"));
    }
  };

  const handleSelectToken = (key:"from"|"to") => {
    dispatch(selectionModal(key));
    dispatch(showModal("swap-selection"));
  }

  const handleFromChange = (value: number) => dispatch(changeInput({ key:"from", value }));
  const handleToChange = (value: number) => dispatch(changeInput({ key:"to", value }));

  const handleSwitch = () => dispatch(switchInputs());
  
  const handleSelectFromToken = () => handleSelectToken("from");
  const handleSelectToToken = () => handleSelectToken("to");


  const confirmDisabled = connected &&
  ((swapState.from === null || swapState.to === null) ||
   (swapState.inputs.from === 0 || swapState.inputs.to === 0));

  //useInputBalanceEffect(swapState.from, swapState.to, syncTokenBalances);

  // const provider = new TonWeb.HttpProvider(import.meta.env.VITE_endpointUrl);

  function SwapClick() {
 
    // res.disconnect()
    // console.log("disconnected", userFriendlyAddress)
    
    
    // const tonweb = new TonWeb();
    // const walletAddress = "EQArx2PlFfgb5c7fUvkn-jOF1onYzYt1e9Nz41yunshgl7KH";
    // const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, { address: walletAddress });
    // const data = await jettonWallet.getData();
    // const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, { address: new TonWeb.utils.Address('')});
    // console.log("This step1", jettonWallet); 
    // const data = await jettonWallet.getData();
    // const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {address: data.jettonMinterAddress.toString(false)});
    // console.log("This step2"); 
    
    // console.log('Jetton balance:', data.balance.toString());
    // console.log('Jetton owner address:', data.ownerAddress.toString(true, true, true));
    console.log("clicked")
  }
  
  // const [tonConnectUi] = useTonConnectUI()
  // const wallet = useTonWallet()
  // const userFriendlyAddress = useTonAddress()
  // const rawAddress = useTonAddress(false)

  // const checkProofInYourBackend = (proof, account) => {
  // }
  // useEffect(() =>
  // tonConnectUi.onStatusChange(wallet => {
  //       if (wallet?.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
  //           checkProofInYourBackend(wallet.connectItems.tonProof.proof, wallet.account);
  //       }
  // }), []);

  // console.log("userFriendlyAddress: ", userFriendlyAddress)
  // console.log("raw address: ", rawAddress);
  // console.log(wallet);

  // console.log("===>",tonConnectUi.connectWallet);
    
    return(
      //   <div className='Container'>
      //   <a
      //     className={`Button `}
      //     onClick={() => {
      //       // connectWallet();
      //     }}
      //   >
      //     Connect Wallet
      //   </a>

      //   <div className='Card'> 
      //     <b>Wallet Address</b>
      //     <div className='Hint' id="div_address"></div>
      //   </div>

      //   <div className='Card'>
      //     <b>Wallet balance</b>
      //     <div id = "div_balance"></div>
      //   </div>
      //   <div>
      //     <p>TON token number</p>
      //     {/* <input type="number" value={0} onChange={handleTONChange} />
      //     <a
      //     style={{marginTop:"30px"}}
      //     className={`Button `}
      //     onClick={() => {
      //       TokenSwap0_1();
      //     }}
      //     >
      //       Swap Token
      //     </a> */}
      //   </div>
      //   <div>
      //     <p>Alix token number</p>
      //     {/* <input type='number' value={inputALEX} onChange={handleALEXChange} />
      //     <a
      //     style={{marginTop:"30px"}}
      //     className={`Button `}
      //     onClick={() => {
      //       TokenSwap1_0();
      //     }}
      //     >
      //       Swap Token
      //     </a> */}
      //   </div>
      // </div>
      <div className="mx-auto px-4 lg:w-1/2 flex flex-col p-0 container pt-2">
        <div className="flex flex-row items-center p-0 justify-between">
          <span className=" font-black text-3xl font-sans text-[#FFFFFF]">Swap</span>
          <TonConnectButton />
        </div>
        <div className="container lg:px-20 pt-14">
          <div className="rounded-lg bg-[#130F25] border border-[#2B2649] p-4">
            <div className="flex flex-col p-0 gap-5">
              <TokenInput
                label='From'
                value={swapState.inputs.from}
                onChange={handleFromChange}
                token={swapState.from}
                onSelectToken={handleSelectFromToken}
              />
              {/* <div className='flex flex-row'>
                <span className='p-3'><ArrowsUpDownIcon className='w-8 h-8 text-[#662483] hover:text-[#FFFFFF]'></ArrowsUpDownIcon></span>
              </div> */}
              <SwitchButton onClick={handleSwitch} />
              <TokenInput
                label='To'
                value={swapState.inputs.to}
                onChange={handleToChange}
                token={swapState.to}
                onSelectToken={handleSelectToToken}
              />
              <span className='flex flex-row items-center gap-2'>
                {swapState.conversionRate !== 0 && swapState.from !== null && swapState.to !== null?
                  <>
                    <Info />
                    <span>
                    1 {swapState.from?.symbol} = {swapState.conversionRate} {swapState.to?.symbol} (${swapState.usdtRate})
                    </span>
                  </>
                  :null }
              </span>
            </div>
            <button className=" bg-[#662483] w-full mt-8" onClick={handleSwap} >Swap</button>
          </div>
        </div>
      </div>
    )
}