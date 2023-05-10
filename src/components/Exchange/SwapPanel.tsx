import { ConfirmSwap } from '../ConfirmSwap/ConfirmSwap';
import {ArrowsUpDownIcon} from '@heroicons/react/24/outline'
import {TonConnectButton, useTonConnectUI, useTonWallet, useTonAddress} from "@tonconnect/ui-react";
import TonWeb from "tonweb";
import { useEffect } from 'react';

import './TONConnectButton.scss';
import { Address } from 'tonweb/dist/types/utils/address';

export const SwapPanel = () => {

  // const provider = new TonWeb.HttpProvider(import.meta.env.VITE_endpointUrl);

  async function SwapClick() {
  
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
  
  const [tonConnectUi] = useTonConnectUI()
  const wallet = useTonWallet()
  const userFriendlyAddress = useTonAddress()
  const rawAddress = useTonAddress(false)

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
              <div className="flex flex-col gap-3 pt-3">
                <div className="flex flex-row justify-between">
                  <label>From</label>
                  <label>Available: </label>
                </div>
                <div className=" bg-[#FFFFFF] border border-[#B9BBBE] h-11 rounded-md flex flex-row items-center">
                  <div className='px-3 py-2 border-r-2 border-[#B9BBBE] w-3/4'>
                    <input type="number" value={20} placeholder="20" className=" text-dark w-20" onChange={()=> {}} />
                  </div>
                  <div className='px-3 py-2 border-[#B9BBBE] w-1/4'>
                    <option className=" text-dark">USDT</option>
                  </div>
                </div>
              </div>
              <div className='flex flex-row'>
                <span className='p-3'><ArrowsUpDownIcon className='w-8 h-8 text-[#662483] hover:text-[#FFFFFF]'></ArrowsUpDownIcon></span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <label>To</label>
                  <label>Available: </label>
                </div>
                <div className=" bg-[#FFFFFF] border border-[#B9BBBE] h-11 rounded-md flex flex-row items-center">
                  <div className='px-3 py-2 border-r-2 border-[#B9BBBE] w-3/4'>
                    <input type="number" value={20} placeholder="20" className=" text-dark w-20" onChange={()=> {}} />
                  </div>
                  <div className='px-3 py-2 border-[#B9BBBE] w-1/4'>
                    <option className=" text-dark">USDT</option>
                  </div>
                </div>
              </div>
            </div>
            <button className=" bg-[#662483] w-full mt-8" onClick={()=> { SwapClick()}}>Swap</button>
          </div>
        </div>
      </div>
    )
}