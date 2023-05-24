import {TonConnectButton, TonConnectUIProvider} from "@tonconnect/ui-react";
import { Link } from "react-router-dom";
import { MainPanel } from "./MainPanel";
import { useState } from "react";
import { Breadcrumbs } from "../Common/BreadCrumb";
import ExchangeHeader from "./ExchangeHeader";
let PanelContent = <MainPanel />

export const Exchange = () => {
    
    return(
        <div className="px-5 py-2 bg-black">
            <div className="px-3 gap-4 flex py-5">
                  <Link to = "/swap" className=" text-btn_color hover:text-white text-lg underline underline-offset-4" >Swap</Link>
                  <hr className=" text-white bg-white text-base w-5 -rotate-45 translate-y-4"/>
                  <Link to = "/liquidity" className="text-btn_color hover:text-white text-lg underline underline-offset-4" >Liquidity</Link>
            </div>
            <ExchangeHeader />
            <MainPanel />
            </div>
    )
}
