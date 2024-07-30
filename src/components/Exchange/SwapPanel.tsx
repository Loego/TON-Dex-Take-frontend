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

  useInputBalanceEffect(
    swapState.from,
    swapState.to,
    syncTokenBalances,
    client
  );

  return (
    <div className="h-full flex">
      <div className="rounded-lg bg-white/70 backdrop-blur-sm dark:bg-black/70 border border-[#BFD9FF] dark:border-[#353535] p-4 shadow-light dark:shadow-dark !max-w-[500px] m-auto">
        <div className="flex flex-col">
          <span className="text-[18px] font-semibold text-[#565656] dark:text-[#ECECEC]">
            Swap
          </span>
          {!isPoolExist && (
            <p className="text-[#565656] dark:text-[#ECECEC] text-normal text-[14px] mt-1">
              Pool doesn't exist
            </p>
          )}
          <div className="relative shadow-containerLight dark:shadow-containerDark rounded-xl mt-3">
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
          <div className="shadow-containerLight dark:shadow-containerDark rounded-xl mt-5">
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
                <span className="text-xs font-semibold dark:text-[#ECECEC] text-[#565656]">
                  1 {swapState.from?.symbol} = {swapState.conversionRate}{" "}
                  {swapState.to?.symbol} ($
                  {swapState.usdtRate})
                </span>
              </div>
            ) : null}
          </span>
        </div>
        <div className="mt-4">
          {wallet ? (
            isPoolExist ? (
              <button
                className="py-[18px] text-center text-base font-semibold leading-normal w-full bg-gradient-to-r from-[#b5d73e] to-[#06a5ff]"
                onClick={handleSwap}
                disabled={confirmDisabled}
              >
                Swap
              </button>
            ) : (
              <button
                onClick={() => navigate("/liquidity")}
                className="py-[18px] text-center text-base font-semibold leading-normal w-full bg-gradient-to-r from-[#b5d73e] to-[#06a5ff]"
              >
                Add liquidity
              </button>
            )
          ) : (
            <button
              className={
                "py-[18px] text-center text-base font-semibold leading-normal w-full bg-gradient-to-r from-[#b5d73e] to-[#06a5ff] cursor-not-allowed"
              }
              disabled={true}
            >
              Swap
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
