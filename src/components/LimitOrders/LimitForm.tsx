import { useContext, useState, useEffect, FormEvent } from "react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/solid";
import { TonConnectButton } from "@tonconnect/ui-react";
import { SubmitOrderData } from "../../action/LimitOrderAction";
import axios from 'axios';

import './limit_order.scss';

export default function LimitForm (){
    const [balanceValue, setbalanceValue] = useState<number>(0);
    const [fromAmount, setfromAmount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        fetchData();
        setTotalAmount(balanceValue * fromAmount);
    }, [balanceValue, fromAmount]);

    const fetchData = async () => {
        console.log("loaded");
        const result = await axios.get(
            `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h&locale=en&x_cg_pro_api_key=CG-cYLMAXA7qqWnK5RXS8WAw5Jk`,
        );
        console.log(result.data);
        // setCoinLists(result.data);
    };

    useEffect(() => {
        if(balanceValue)
            setfromAmount(totalAmount / balanceValue);
    }, [totalAmount]);

    function handleLimitDecrement() {
        if (balanceValue > 0) {
            setbalanceValue((prevValue) => prevValue - 1);
        }
    }
    function handleFromDecrement() {
        if (fromAmount > 0) {
            setfromAmount((prevValue) => prevValue - 1);
            console.log("totoal:", totalAmount, fromAmount);
        }
    }

    const handleTotalDecrement = () => {
        if (fromAmount > 0) {
            setTotalAmount((prevValue) => prevValue - 1);
        }
    }

    function handleFromIncrement() {
        setfromAmount((prevValue) => prevValue + 1);
    }

    function handleLimitIncrement() {
        setbalanceValue((prevValue) => prevValue + 1);
    }

    const handleTotalIncrement = () => {
        setTotalAmount((prevValue) => prevValue + 1);
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const orderData  = {
            limitBalance: balanceValue,
            fromAmount: fromAmount,
            totalAmount: totalAmount
        };
        SubmitOrderData(orderData);
    }

    return(
        <form id = "myLimitOrder" className=" grid grid-flow-row items-center gap-3 p-5">
            <div className="flex justify-between items-center rounded-lg p-1 mt-2.5 w-full h-9 border border-[#00000014] bg-white/10">
                <button
                    type="button"
                    onClick={handleLimitDecrement}
                    className="w-6 h-6 bg-gray-400 !rounded !p-0 hover:bg-gray-200 text-white/75 font-bold"
                >
                    <MinusSmallIcon className=""></MinusSmallIcon>
                </button>
                <div className=" bg-transparent w-full" >
                <input
                    type="number"
                    id="num-input"
                    placeholder="0"
                    value={balanceValue}
                    onChange={(e) => setbalanceValue(parseFloat(e.target.value.length == 0 ? "0" : e.target.value))}
                    className="w-full text-white/80 bg-transparent text-center py-2 px-4 leading-tight focus:outline-none focus:inset-3 focus:shadow-outline focus:border focus:rounded-xl"
                />
                </div>
                <button
                    type="button"
                    onClick={handleLimitIncrement}
                    className="w-6 h-6 bg-gray-400 !rounded !p-0 hover:bg-gray-200 text-white/75 font-bold"
                >
                    <PlusSmallIcon></PlusSmallIcon>
                </button>
            </div>
            <div className="flex justify-between items-center rounded-lg p-1 mt-2.5 w-full h-9 border border-[#00000014] bg-white/10">
                <button
                    type="button"
                    onClick={handleFromDecrement}
                    className="w-6 h-6 bg-gray-400 !rounded !p-0 hover:bg-gray-200 text-white/75 font-bold"
                >
                    <MinusSmallIcon className=""></MinusSmallIcon>
                </button>
                <div className=" bg-transparent w-full" >
                <input
                    type="number"
                    id="num-input"
                    placeholder="Amount USDT"
                    value={fromAmount}
                    onChange={(e) => setfromAmount(parseFloat(e.target.value.length == 0 ? "0" : e.target.value))}
                    className="w-full text-white/80 bg-transparent text-center py-2 px-4 leading-tight focus:outline-none focus:inset-3 focus:shadow-outline focus:border focus:rounded-xl"
                />
                </div>
                <button
                    type="button"
                    onClick={handleFromIncrement}
                    className="w-6 h-6 bg-gray-400 !rounded !p-0 hover:bg-gray-200 text-white/75 font-bold"
                >
                    <PlusSmallIcon></PlusSmallIcon>
                </button>
            </div>
            <div className="w-full grid grid-flow-col items-center justify-between px-1">
                <div className="balance_div">Available Balance</div>
                <div className="amount_div">0 ETH</div>
            </div>
            <div className="flex justify-between items-center rounded-lg p-1 mt-2.5 w-full h-9 border border-[#00000014] bg-white/10">
                <button
                    type="button"
                    onClick={handleTotalDecrement}
                    className="w-6 h-6 bg-gray-400 !rounded !p-0 hover:bg-gray-200 text-white/75 font-bold"
                >
                    <MinusSmallIcon className=""></MinusSmallIcon>
                </button>
                <div className=" bg-transparent w-full" >
                <input
                    type="number"
                    id="num-input"
                    placeholder="0"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(parseFloat(e.target.value.length == 0 ? "0" : e.target.value))}
                    className="w-full text-white/80 bg-transparent text-center py-2 px-4 leading-tight focus:outline-none focus:inset-3 focus:shadow-outline focus:border focus:rounded-xl"
                />
                </div>
                <button
                    type="button"
                    onClick={handleTotalIncrement}
                    className="w-6 h-6 bg-gray-400 !rounded !p-0 hover:bg-gray-200 text-white/75 font-bold"
                >
                    <PlusSmallIcon></PlusSmallIcon>
                </button>
            </div>
            <div className="w-full px-1 grid grid-flow-col items-center justify-between">
                <div className="balance_div">Available Balance</div>
                <div className="amount_div">0 USDT</div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row justify-between text-center items-center">
                <TonConnectButton />
                <button onClick={handleSubmit} className=" bg-btn_color h-10 rounded-sm text-center items-center justify-center"><span className="text-center items-center justify-center">Submit</span></button>
            </div>
            <div className="w-full px-1 grid grid-flow-col items-center justify-between">
                <div className="balance_div">Network Fee</div>
                <div className="amount_div">0 USDT</div>
            </div>
        </form>
    )
}

