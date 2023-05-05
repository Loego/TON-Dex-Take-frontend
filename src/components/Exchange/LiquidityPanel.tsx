import { AdjustmentsHorizontalIcon, ArrowPathIcon } from "@heroicons/react/20/solid"

export const LiquidityPanel = () => {
    return(
        <div className="mx-auto px-4 lg:w-1/2 flex flex-col p-5 container pt-5">
            <div className=" rounded-t-2xl bg-[#130F25] border border-[#2B2649] py-6 px-8 flex flex-row justify-between">
                <div><h2 className=" font-bold text-2xl">Your liquidity</h2><span className=" mt-2">Remove liquidity to receive tokens back</span></div>
                <div className=" items-center flex flex-row gap-3">
                    <button className="p-1 outline-0 border-0 bg-transparent border-none">
                        <AdjustmentsHorizontalIcon className="w-6 h-6 text-[#1FC7D4] hover:opacity-50" onClick={() => {console.log("hi")}}></AdjustmentsHorizontalIcon>
                    </button>
                    <button className="p-1 outline-0 border-0 bg-transparent">
                        <ArrowPathIcon className="w-6 h-6 text-[#1FC7D4] hover:opacity-50" onClick={() => {console.log("hi")}}></ArrowPathIcon>
                    </button>
                </div>
            </div>
            <div className=" bg-[#000000] px-5 py-7 border-x border-[#2B2649]">
                <p className=" text-center">Connect to a wallet to view your liquidity.</p>
            </div>
            <div className=" rounded-b-2xl bg-[#130F25] border border-[#2B2649] py-6 px-8">
                <button className=" bg-btn_color w-full"> + Add Liquidity</button>
            </div>
        </div>
    )
    
}