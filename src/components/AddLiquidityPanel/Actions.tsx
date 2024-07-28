import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { approveToken, selectLiquidity } from "../../redux/reducers/liquidity";
import { showModal } from "../../redux/reducers/modals";

export default function Actions() {
  const { add, token1, token2, inputs } = useAppSelector(selectLiquidity);
  const dispatch = useAppDispatch();

  const handleApproveToken1 = () => dispatch(approveToken("token1"));
  const handleApproveToken2 = () => dispatch(approveToken("token2"));

  console.log(add, token1);
  const supplyDisabled = inputs.token1 === 0 || inputs.token2 === 0;

  const handleSupplyClick = () => {
    dispatch(showModal("confirm-supply"));
  };

  return (
    <div className="mt-5">
      <button
        className="py-[18px] text-center text-[16px] font-semibold leading-normal w-full bg-gradient-to-r from-[#b5d73e] to-[#06a5ff]"
        onClick={handleSupplyClick}
        disabled={supplyDisabled}
      >
        Supply
      </button>
    </div>
  );
}
