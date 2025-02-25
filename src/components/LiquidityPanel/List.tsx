import cn from "classnames";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { PoolPositionInfo } from "../../api/pool";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAccount } from "../../redux/reducers/account";
import {
  changeRemovePosition,
  changeToken,
  panel,
  retrieveLiquidities,
  selectLiquidity,
} from "../../redux/reducers/liquidity";
import Button from "../Button";
import Chevron from "../icons/Chevron";
import styles from "./index.module.scss";
import { useTonClient } from "../../hook/useTonClient";
import { useTonConnect } from "../../hook/useTonConnect";
import { showModal } from "../../redux/reducers/modals";
import { selectTokens } from "../../redux/reducers/tokens";

export default function List() {
  const { walletAddress } = useAppSelector(selectAccount);
  const { liquidity, isListingLiquidities } = useAppSelector(selectLiquidity);
  const { totalTokens } = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();

  const client = useTonClient();

  const { connected } = useTonConnect();

  useEffect(() => {
    const handleInterval = () => {
      if (
        client &&
        walletAddress &&
        dispatch &&
        totalTokens &&
        totalTokens.length
      ) {
        dispatch(retrieveLiquidities(client));
      }
    };
    const tId = setInterval(handleInterval, 10000);

    return () => {
      clearInterval(tId);
    };
  }, [walletAddress, dispatch, client, totalTokens]);

  return (
    <div className={styles.list}>
      <h3 className="text-[#565656] dark:text-[#ECECEC] font-bold border-b border-solid border-black/10 dark:border-white/10">
        Your Pools
      </h3>
      {!connected ? (
        <NotConnected />
      ) : liquidity === null || liquidity.length === 0 ? (
        isListingLiquidities ? (
          <p className="text-[#565656] dark:text-[#ECECEC]">
            Fetching liquidity data
          </p>
        ) : (
          <EmptyList />
        )
      ) : (
        liquidity.map((position, index) => (
          <Item
            key={position.pool?.address ?? `pos-${index}`}
            positionInfo={position}
          />
        ))
      )}
    </div>
  );
}

function NotConnected() {
  return (
    <div className={`${styles.emptyList} text-black/80 dark:text-white`}>
      <h5>Connect to a wallet to view your liquidity.</h5>
    </div>
  );
}
function EmptyList() {
  return (
    <div className={styles.emptyList}>
      <h5 className="text-[#565656] dark:text-[#ECECEC]">
        No liquidity found.
      </h5>
    </div>
  );
}

interface IItemProps {
  positionInfo: PoolPositionInfo;
}

function Item({ positionInfo }: IItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { pool } = positionInfo;

  const handleExpanded = () => {
    setExpanded((p) => !p);
  };

  const handleRemoveClick = () => {
    dispatch(changeRemovePosition(positionInfo));
    dispatch(showModal("confirm-remove"));
  };

  const handleAddLiquidity = () => {
    if (pool?.token1) {
      dispatch(changeToken({ key: "token1", value: pool.token1 }));
    }

    if (pool?.token2) {
      dispatch(changeToken({ key: "token2", value: pool.token2 }));
    }

    dispatch(panel("add"));
  };

  return (
    <div>
      <div className={styles.item} onClick={handleExpanded}>
        <img alt={pool?.token1?.name} src={pool?.token1?.logoURI} />
        <img alt={pool?.token2?.name} src={pool?.token2?.logoURI} />
        <span>
          {pool?.token1?.symbol}/{pool?.token2?.symbol}
        </span>
        <Chevron className={cn({ [styles.expandedChevron]: expanded })} />
      </div>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={expanded}
        timeout={300}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
      >
        <div className={styles.details}>
          <div className={styles.info}>
            <label>Pooled {pool?.token1?.symbol}:</label>
            <span>
              {positionInfo.token1V?.toFixed(5) ?? 0}{" "}
              <img alt={pool?.token1?.name} src={pool?.token1?.logoURI} />
            </span>
            <label>Pooled {pool?.token2?.symbol}:</label>
            <span>
              {positionInfo.token2V?.toFixed(5) ?? 0}{" "}
              <img alt={pool?.token2?.name} src={pool?.token2?.logoURI} />
            </span>
            <label>Pool Tokens:</label>
            <span>{positionInfo.liquidityTokens.toFixed(5)}</span>
            {/* <label>Pool Share:</label>
            <span>{positionInfo.share?.toFixed(3)}%</span> */}
          </div>
          <div className={styles.actions}>
            <Button
              buttonType="primarySmall"
              title="Add"
              onClick={handleAddLiquidity}
            />
            <Button
              buttonType="primarySmall"
              title="Remove"
              onClick={handleRemoveClick}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
