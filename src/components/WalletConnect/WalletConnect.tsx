import { useTonConnectUI, useTonAddress, TonConnectButton, toUserFriendlyAddress, useIsConnectionRestored } from "@tonconnect/ui-react"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { connect, selectAccount } from "../../redux/reducers/account";
import  Loader  from 'react-loader-spinner';
import { changeInput, selectionModal, selectSwap, switchInputs, syncTokenBalances } from '../../redux/reducers/swap';

export default function WalletConnect() {
    const connectionRestored = useIsConnectionRestored();

    const [buttonString, setbuttonString] = useState("Connect Wallet");
    const dispatch = useAppDispatch();
    const [connectState, setConnectState] = useState(false);
    const [connectUi] = useTonConnectUI();
    
    if(!connectionRestored){
        console.log("wait");
    }
    // const accountState = useAppSelector(selectAccount);
    // const connected = accountState.walletAddress !== null && accountState.walletAddress !== "";

    // const buttonClick = async () => {
    //     // console.log("ok1");
    //     if(!connected){

    //         dispatch(connect(useTonAddress()))
    //         console.log("ee");
    //         // dispatch(connect(useTonAddress()));
    //     }
    //         // console.log("WalletAddress:", userFriendlyAddress);
    // }

    console.log("OK");
        return(
        <>
            <TonConnectButton />
        </>
    )
}