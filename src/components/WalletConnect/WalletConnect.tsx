import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { connect, selectAccount } from "../../redux/reducers/account";

export default function WalletConnect() {
    const dispatch = useAppDispatch();
    const [connectState, setConnectState] = useState(false);
    const [connectUi] = useTonConnectUI();
    const walletAddress = useTonAddress();
    
    const handleWalletConnect = async () => {
        await connectUi.connectWallet()
        await setConnectState(true)
        await dispatch(connect(walletAddress));
    }
    const handleDisConnect = async () => {
        await connectUi.disconnect()
        await setConnectState(false)
    }
    let buttonContent = {}
    if(!connectState)
        buttonContent = (<button className=" bg-btn_color py-2" onClick={handleWalletConnect}> Connect Wallet </button>)
    else {
        buttonContent = (<button className=" bg-btn_color py-2" onClick={handleDisConnect}>DisConnect</button>)
    }
        return(
        <>
            {buttonContent}
        </>
    )
}