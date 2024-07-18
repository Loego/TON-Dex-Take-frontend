import styles from "./index.module.scss";

export default function SwapHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.text}>
        <span className="text-[18px] font-semibold text-[#565656] dark:text-[#ECECEC]">
          Swap
        </span>
      </div>
    </div>
  );
}
