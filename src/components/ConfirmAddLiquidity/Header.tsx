import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { showModal } from "../../redux/reducers/modals";
import Close from "../icons/Close";
import styles from "./index.module.scss";

export default function Header() {
  const dispatch = useAppDispatch();

  const handleDismiss = () => dispatch(showModal(null));

  return (
    <div className="flex flex-row justify-between">
      <h2 className="text-[#565656] dark:text-[#ECECEC] text-[18px] font-semibold">
        You'll Recieve
      </h2>
      <Close className=" cursor-pointer" onClick={handleDismiss} />
    </div>
  );
}
