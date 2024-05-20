import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
  useTonAddress,
  TonConnectUI,
} from "@tonconnect/ui-react";
import { useEffect } from "react";
import { showModal } from "../../redux/reducers/modals";
import { connect, selectAccount } from "../../redux/reducers/account";
import { useInputBalanceEffect } from "../../utils/hooks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  changeInput,
  selectionModal,
  selectSwap,
  switchInputs,
  syncTokenBalances,
  conversionRate,
} from "../../redux/reducers/swap";
import { selectTokens } from "../../redux/reducers/tokens";
import Info from "../icons/Info";
import SwitchButton from "../SwitchButton/SwitchButton";
import TokenInput from "../TokenInput2";
import SwapHeader from "./SwapHeader";

import "./TONConnectButton.scss";

export const SwapPanel = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const accountState = useAppSelector(selectAccount);
  const swapState = useAppSelector(selectSwap);
  const tokenState = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();

  const connected =
    accountState.walletAddress !== null && accountState.walletAddress !== "";
  const userFriendlyAddress = useTonAddress();

  useEffect(() => {
    if (swapState.from !== null && swapState.to !== null)
      dispatch(conversionRate({ from: swapState.from, to: swapState.to }));
    if (userFriendlyAddress !== "" || userFriendlyAddress !== null)
      dispatch(connect(userFriendlyAddress));
  }, [userFriendlyAddress, swapState]);

  const handleConnect = async () => {
    await tonConnectUI.connectWallet();
  };
  const handleSwap = () => {
    dispatch(showModal("swap-confirmation"));
  };

  const handleSelectToken = (key: "from" | "to") => {
    dispatch(selectionModal(key));
    dispatch(showModal("swap-selection"));
  };
  let mainContent = {};

  mainContent = tokenState.displayList.length === 0 ? <div></div> : <div></div>;

  const handleFromChange = (value: number) =>
    dispatch(changeInput({ key: "from", value }));
  const handleToChange = (value: number) =>
    dispatch(changeInput({ key: "to", value }));

  const handleSwitch = () => dispatch(switchInputs());

  const handleSelectFromToken = () => handleSelectToken("from");
  const handleSelectToToken = () => handleSelectToken("to");

  const confirmDisabled =
    swapState.from === null ||
    swapState.to === null ||
    (swapState.inputs.from === 0 && swapState.inputs.to === 0);

  useInputBalanceEffect(swapState.from, swapState.to, syncTokenBalances);

  return (
    <div className=" bg-layout_dark">
      <div className="mx-auto px-4 lg:w-1/2 flex flex-col p-0 container pt-2 pb-5">
        <div className="container lg:px-20 pt-14">
          <div className="rounded-lg bg-[#130F25] border border-[#2B2649] p-4">
            <div className="flex flex-col py-2 px-4 gap-5">
              <SwapHeader />
              <TokenInput
                label="From"
                value={swapState.inputs.from}
                onChange={handleFromChange}
                token={swapState.from}
                onSelectToken={handleSelectFromToken}
              />
              <SwitchButton onClick={handleSwitch} />
              <TokenInput
                label="To"
                value={swapState.inputs.to}
                onChange={handleToChange}
                token={swapState.to}
                onSelectToken={handleSelectToToken}
              />
              <span className="flex flex-row items-center gap-2">
                {swapState.conversionRate !== 0 &&
                swapState.from !== null &&
                swapState.to !== null ? (
                  <div>
                    <Info />
                    <span>
                      1 {swapState.from?.symbol} = {swapState.conversionRate}{" "}
                      {swapState.to?.symbol} (${swapState.usdtRate})
                    </span>
                  </div>
                ) : null}
              </span>
            </div>
            <TonConnectButton />
            {wallet ? (
              <button
                className="bg-[#662483] w-full mt-8"
                onClick={handleSwap}
                disabled={confirmDisabled}
              >
                Swap
              </button>
            ) : (
              <button
                className=" bg-[#662483] w-full mt-8"
                onClick={handleConnect}
              >
                Connect wallet{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
