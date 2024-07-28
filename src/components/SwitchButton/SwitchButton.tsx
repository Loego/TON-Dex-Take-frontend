import swap from "../../assets/swap-icon.svg";

export default function SwitchButton({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick}>
      <img
        src={swap}
        alt="swapImg"
        className="hover:rotate-180 transition-all duration-1000 ease-in-out hover:cursor-pointer"
      />
    </div>
  );
}
