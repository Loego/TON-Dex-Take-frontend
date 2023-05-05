import {TonConnectButton, TonConnectUIProvider} from "@tonconnect/ui-react";
import { MainPanel } from "./MainPanel";
import { SwapPanel } from "./SwapPanel";
import { LiquidityPanel } from "./LiquidityPanel";
import { useState } from "react";
import { Breadcrumbs } from "../Common/BreadCrumb";
let PanelContent = <MainPanel />

export const Exchange = () => {
    console.log("Hello");

    const [state_flag, set_state_flag] = useState(0);
    // const setSwap = () => {
    //     console.log("Swap button clicked");
    //     set_state_flag(true);
    // }
    
    // console.log(state_flag);
    // switch(state_flag) {
    //     case 0:
    //         PanelContent = <MainPanel />
    //     case 1:
    //         PanelContent = <SwapPanel />
    //     case 2:
    //         PanelContent = <LiquidityPanel />
    // }
    if(state_flag == 1)
        PanelContent = <SwapPanel />
    else if(state_flag == 2)
        PanelContent = <LiquidityPanel />
    else if(state_flag == 0)
        PanelContent = <MainPanel />
    
    return(
        <div className = "bg-layout_dark p-3 gap-2 w-full m-0 h-screen">
            <div className="px-3 gap-4 flex py-5">
                <button className=" bg-btn_color" onClick={ () => set_state_flag(1) }>Swap</button>
                <button className="bg-btn_color" onClick={ () => set_state_flag(2) }>Liquidity</button>
                {/* <Breadcrumbs /> */}
            </div>
            { PanelContent }
        </div>
    )
}
