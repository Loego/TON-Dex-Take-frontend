
import { useEffect } from 'react';
import { showModal } from '../../redux/reducers/modals';
import { connect, selectAccount } from "../../redux/reducers/account";
import { useInputBalanceEffect } from "../../utils/hooks";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeInput, selectionModal, selectSwap, switchInputs, syncTokenBalances, conversionRate } from '../../redux/reducers/swap';
import { selectTokens } from "../../redux/reducers/tokens";
import { LimitOrderTab } from './LimitOrderTab';
import Info from "../icons/Info";
import SwitchButton from '../SwitchButton/SwitchButton';
import TokenInput from "../TokenInput2";

import './limit_order.scss';

export const LimitOrders = () => {
    // const wallet = useTonWallet();
    // const [tonConnectUI] = useTonConnectUI();
    const accountState = useAppSelector(selectAccount);
    const swapState = useAppSelector(selectSwap);
    const tokenState = useAppSelector(selectTokens);
    const dispatch = useAppDispatch();

    const handleFromChange = (value: number) => dispatch(changeInput({ key:"from", value }));
    const handleToChange = (value: number) => dispatch(changeInput({ key:"to", value }));
    const handleSwap = () => {
        dispatch(showModal("swap-confirmation"));
    };
  
    const handleSelectToken = (key:"from"|"to") => {
      dispatch(selectionModal(key));
      dispatch(showModal("swap-selection"));
    }
    const handleSwitch = () => dispatch(switchInputs());
    
    const handleSelectFromToken = () => handleSelectToken("from");
    const handleSelectToToken = () => handleSelectToken("to");
    
    return(
        <>
            <div className='py-2 flex flex-col'>
                <div className='px-5'>
                    <ul className='flex flex-row items-center border-solid rounded-xl bg-[#07071c] w-full p-1'>
                        <li className='selected'>
                            <div className=' text-[#191a33]'>BUY</div>
                        </li>
                        <li className='unselected'>
                            <div className=''>SELL</div>
                        </li>
                    </ul>
                </div>
                <LimitOrderTab />
            </div>
        </>
    )
}

