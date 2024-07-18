import {
  useTonConnectUI,
  useTonWallet,
  useTonAddress,
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
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
import SwitchButton from "../SwitchButton/SwitchButton";
import TokenInput from "../TokenInput2";
import SwapHeader from "./SwapHeader";

import "./TONConnectButton.scss";
import { useTonClient } from "../../hook/useTonClient";
import { getPoolExist } from "../../api/pool";
import { useNavigate } from "react-router-dom";

export const SwapPanel = () => {
  const navigate = useNavigate();
  const [isPoolExist, setIsPoolExist] = useState(true);
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const accountState = useAppSelector(selectAccount);
  const swapState = useAppSelector(selectSwap);
  const tokenState = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();

  const client = useTonClient();

  const connected =
    accountState.walletAddress !== null && accountState.walletAddress !== "";
  const userFriendlyAddress = useTonAddress();

  useEffect(() => {
    if (swapState.from !== null && swapState.to !== null && client)
      dispatch(
        conversionRate({
          client,
          from: swapState.from,
          to: swapState.to,
          isFrom: swapState.inputs.isFrom,
          amount: swapState.inputs.isFrom
            ? swapState.inputs.from
            : swapState.inputs.to,
        })
      );
    if (userFriendlyAddress !== "" || userFriendlyAddress !== null) {
      dispatch(connect(userFriendlyAddress));
    }
  }, [userFriendlyAddress, swapState, client]);

  useEffect(() => {
    (async () => {
      if (swapState.from !== null && swapState.to !== null && client) {
        try {
          const poolExist = await getPoolExist(
            client,
            swapState.from?.address,
            swapState.to?.address
          );

          setIsPoolExist(poolExist);
        } catch (e) {
          setIsPoolExist(false);
        }
      }
    })();
  }, [swapState.from, swapState.to, client]);

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
          <div className="rounded-lg bg-[#FFFFFFCC] dark:bg-[#111111CC] border border-[#BFD9FF] dark:border-[#353535] pt-[35px] pb-[42px] px-[22px] shadow-light dark:shadow-dark !max-w-[500px] mx-auto">
            <div className="flex flex-col">
              <SwapHeader />
              {!isPoolExist && (
                <p className="text-[#565656] dark:text-[#ECECEC] text-normal text-[14px] mt-1">
                  Pool doesn't exist
                </p>
              )}
              <div className="relative shadow-containerLight dark:shadow-containerDark rounded-[12px] mt-[29px]">
                <TokenInput
                  value={swapState.inputs.from}
                  onChange={handleFromChange}
                  token={swapState.from}
                  onSelectToken={handleSelectFromToken}
                />
                <div className="absolute bottom-[-37px] left-[calc(50%-28px)]">
                  <SwitchButton onClick={handleSwitch} />
                </div>
              </div>
              <div className="shadow-containerLight dark:shadow-containerDark rounded-[12px] mt-5">
                <TokenInput
                  value={swapState.inputs.to}
                  onChange={handleToChange}
                  token={swapState.to}
                  onSelectToken={handleSelectToToken}
                />
              </div>
              <span className="flex flex-row items-center gap-2 justify-end mb-2">
                {swapState.conversionRate !== 0 &&
                swapState.from !== null &&
                swapState.to !== null ? (
                  <div>
                    <span className="text-[12px] font-semibold dark:text-[#ECECEC] text-[#565656]">
                      1 {swapState.from?.symbol} = {swapState.conversionRate}{" "}
                      {swapState.to?.symbol} ($
                      {swapState.usdtRate})
                    </span>
                  </div>
                ) : null}
              </span>
            </div>
            {wallet ? (
              isPoolExist ? (
                <button
                  className="swap-button py-[18px] text-center text-[16px] font-semibold leading-normal w-full"
                  onClick={handleSwap}
                  disabled={confirmDisabled}
                >
                  Swap
                </button>
              ) : (
                <button
                  onClick={() => navigate("/liquidity")}
                  className="swap-button py-[18px] text-center text-[16px] font-semibold leading-normal w-full"
                >
                  Add liquidity
                </button>
              )
            ) : (
              <button
                className={`swap-button py-[18px] text-center text-[16px] font-semibold leading-normal w-full ${
                  wallet ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                disabled={true}
              >
                Swap
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
