import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  calculateShare,
  changeInput,
  conversionRate,
  selectionModal,
  selectLiquidity,
  syncTokenBalances,
} from "../../redux/reducers/liquidity";
import { showModal } from "../../redux/reducers/modals";
import { useInputBalanceEffect } from "../../utils/hooks";
import TokenInput from "../TokenInput2";
import Actions from "./Actions";
import Info from "./Info";
import { useTonClient } from "../../hook/useTonClient";
import { switchInputs } from "../../redux/reducers/swap";

export default function AddLiquidityPanel() {
  const liquidityState = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const client = useTonClient();

  const handleFromChange = (value: number) =>
    dispatch(changeInput({ key: "token1", value }));

  const handleToChange = (value: number) =>
    dispatch(changeInput({ key: "token2", value }));

  const handleSelectToken = (key: "token1" | "token2") => {
    dispatch(selectionModal(key));
    dispatch(showModal("liquidity-selection"));
  };
  const handleSelectFromToken = () => handleSelectToken("token1");
  const handleSelectToToken = () => handleSelectToken("token2");
  const handleSwitch = () => dispatch(switchInputs());

  useInputBalanceEffect(
    liquidityState.token1,
    liquidityState.token2,
    syncTokenBalances,
    client
  );

  useEffect(() => {
    if (client) {
      dispatch(calculateShare({ client }));
    }
  }, [
    dispatch,
    liquidityState.token1,
    liquidityState.token2,
    liquidityState.inputs.token1,
    liquidityState.inputs.token2,
    client,
  ]);

  useEffect(() => {
    if (client) dispatch(conversionRate(client));
  }, [dispatch, liquidityState.token1, liquidityState.token2, client]);

  return (
    <div className="rounded-lg bg-white/70 backdrop-blur-sm dark:bg-black/70 border border-[#BFD9FF] dark:border-[#353535] p-4 shadow-light dark:shadow-dark !max-w-[500px] m-auto">
      <div className="flex flex-col">
        <span className="text-[18px] font-semibold text-[#565656] dark:text-[#ECECEC]">
          Add liquidity
        </span>
        <div className="relative shadow-containerLight dark:shadow-containerDark rounded-xl mt-3">
          <TokenInput
            value={liquidityState.inputs.token1}
            onChange={handleFromChange}
            token={liquidityState.token1}
            onSelectToken={handleSelectFromToken}
            showMax
          />
          {/* <div className="absolute bottom-[-37px] left-[calc(50%-28px)]">
              <SwitchButton onClick={handleSwitch} />
            </div> */}
        </div>
        <div className="shadow-containerLight dark:shadow-containerDark rounded-xl mt-3">
          <TokenInput
            value={liquidityState.inputs.token2}
            onChange={handleToChange}
            token={liquidityState.token2}
            onSelectToken={handleSelectToToken}
          />
        </div>
        <Info />
        <Actions />
      </div>
    </div>
  );
}
