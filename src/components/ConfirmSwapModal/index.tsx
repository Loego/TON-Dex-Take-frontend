import React, { useEffect, useState } from "react";
import TonWeb from "tonweb";
import { Token } from "../../api/tokens";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { showModal } from "../../redux/reducers/modals";
import { confirmSwap, selectSwap } from "../../redux/reducers/swap";
import { connect, selectAccount } from "../../redux/reducers/account";
import { Router, ROUTER_REVISION, ROUTER_REVISION_ADDRESS } from "@ston-fi/sdk";

import Button from "../Button";
import Arrow from "../icons/Arrow";
import Close from "../icons/Close";
import styles from "./index.module.scss";
import account from "../../redux/reducers/account";
import { useTonConnectUI } from "@tonconnect/ui-react";
import swap from "../../contracts/Swap";
import { MessageData } from "@ston-fi/sdk/dist/types";
import { useTonClient } from "../../hook/useTonClient";
import { Address, beginCell, toNano } from "@ton/core";
import { Router as RouterContract } from "../../contracts/Router";
import { JettonMaster } from "@ton/ton";
import { useTonConnect } from "../../hook/useTonConnect";

export default function ConfirmSwapModal() {
  const swapState = useAppSelector(selectSwap);
  const accountState = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const [tonconnect] = useTonConnectUI();

  const client = useTonClient();
  const { sender } = useTonConnect();

  const handleDismiss = () => dispatch(showModal(null));
  const preventClickThroughs = (e: React.MouseEvent<HTMLElement>) =>
    e.stopPropagation();

  if (swapState.from === null || swapState.to === null) {
    return null;
  }

  const confirmDisabled =
    swapState.inputs.from !== 0 && swapState.inputs.to !== 0;

  const handleConfirmClick = async () => {
    console.log("Swap button clicked");
    if (
      swapState.from !== null &&
      swapState.to !== null &&
      accountState.walletAddress !== null &&
      client
    ) {
      const routerAddress = import.meta.env.VITE_ROUTER_ADDRESS;
      const router = client.open(
        RouterContract.createFromAddress(Address.parse(routerAddress))
      );

      const token1Contract = client.open(
        JettonMaster.create(Address.parse(swapState.from.address))
      );
      const token2Contract = client.open(
        JettonMaster.create(Address.parse(swapState.to.address))
      );

      const token1WalletAddress = await token1Contract.getWalletAddress(
        Address.parse(accountState.walletAddress)
      );
      const token2WalletAddress = await token2Contract.getWalletAddress(
        Address.parse(accountState.walletAddress)
      );

      const routerToken1WalletAddress = await token1Contract.getWalletAddress(
        Address.parse(routerAddress)
      );
      const routerToken2WalletAddress = await token2Contract.getWalletAddress(
        Address.parse(routerAddress)
      );

      const forwardPayload = beginCell()
        .storeUint(0x25938561, 32) // provide lp
        .storeAddress(routerToken2WalletAddress) // another token wallet address of router
        .storeCoins(toNano(0.1))
        .storeAddress(Address.parse(accountState.walletAddress))
        .storeInt(0n, 1)
        .endCell();
      const messageBody = beginCell()
        .storeUint(0x0f8a7ea5, 32) // opcode for jetton transfer
        .storeUint(0, 64) // query id
        .storeCoins(toNano(swapState.inputs.from)) // jetton amount, amount * 10^9
        .storeAddress(Address.parse(routerAddress))
        .storeAddress(Address.parse(routerAddress)) // response destination
        .storeMaybeRef(null) // no custom payload
        .storeCoins(toNano(0.1)) // forward amount - if >0, will send notification message
        .storeBit(1)
        .storeRef(forwardPayload)
        .endCell();

      const internalMessage = {
        to: token1WalletAddress,
        value: toNano(0.5),
        body: messageBody,
      };

      await sender.send([internalMessage]);
    }
    //   const provider = new TonWeb.HttpProvider(import.meta.env.VITE_endpointUrl);

    //   const router = new Router(provider, {
    //     revision: ROUTER_REVISION.V1,
    //     address: ROUTER_REVISION_ADDRESS.V1,
    //   });

    //   if(swapState.from !== null && swapState.to !== null && accountState.walletAddress !== null){
    //     if(swapState.from.symbol === "pTON"){

    //       console.log("minAskAmount:", swapState.inputs.to * (10**swapState.to.decimals));
    //       const params = await router.buildSwapProxyTonTxParams({
    //         userWalletAddress: accountState.walletAddress,
    //         proxyTonAddress: swapState.from.address,
    //         askJettonAddress: swapState.to.address,
    //         offerAmount: new TonWeb.utils.BN(swapState.inputs.from * 1000000000),
    //         minAskAmount: new TonWeb.utils.BN(swapState.inputs.to * (10**swapState.to.decimals)),
    //         queryId: 12345,
    //       });
    //       console.log("entered pTON")
    //       const res = tonconnect.sendTransaction({
    //         messages: [
    //           {
    //             address: params.to.toString(true, true, true),
    //             amount: params.gasAmount.toString(),
    //             payload: TonWeb.utils.bytesToBase64(await params.payload.toBoc()),
    //             stateInit: undefined,
    //           },
    //         ],
    //         validUntil: Date.now() + swapState.settings.txDeadline * 60 * 1000,
    //       })
    //       console.log("res", res);
    //     } else {
    //       const params = await router.buildSwapJettonTxParams({
    //         userWalletAddress: accountState.walletAddress,
    //         offerJettonAddress: swapState.from.address, // JETTON0
    //         askJettonAddress: swapState.to.address, // JETTON1
    //         offerAmount: new TonWeb.utils.BN(swapState.inputs.from * (10**swapState.from.decimals)),
    //         minAskAmount: new TonWeb.utils.BN(swapState.inputs.to * (10**swapState.to.decimals)),
    //         queryId: new TonWeb.utils.BN(1234561),
    //       });
    //       console.log("entered UnpTON")
    //       const res = tonconnect.sendTransaction({
    //         messages: [
    //           {
    //             address: params.to.toString(true, true, true),
    //             amount: params.gasAmount.toString(),
    //             payload: TonWeb.utils.bytesToBase64(await params.payload.toBoc()),
    //             stateInit: undefined,
    //           },
    //         ],
    //         validUntil: Date.now() + swapState.settings.txDeadline * 60 * 1000,
    //       })
    //       console.log("res", res);
    //     }

    //   console.log("2");
    // }

    // dispatch(confirmSwap({
    //   from:swapState.from,
    //   to:swapState.to,
    //   value: swapState.inputs.from
    // }));
    // alert("ok");}
  };

  return (
    <div className={styles.container} onClick={preventClickThroughs}>
      <div className={styles.title}>
        <h2>Confirm Swap</h2>
        <Close onClick={handleDismiss} />
      </div>
      <div className={styles.transactionSummary}>
        <TokenItem token={swapState.from} amount={swapState.inputs.from} />
        <Arrow />
        <TokenItem token={swapState.to} amount={swapState.inputs.to} />
      </div>
      <p className={styles.estimation}>
        Estimated Output, You will receive at least{" "}
        <strong>{swapState.inputs.to}</strong> {swapState.to.symbol} or
        transaction will revert.
      </p>
      <TransactionInfo
        from={swapState.from.symbol}
        to={swapState.to.symbol}
        value={swapState.inputs.to}
      />
      <Button
        className=" bg-btn_color"
        buttonType="primaryLarge"
        title="Confirm Swap"
        onClick={handleConfirmClick}
        disabled={!confirmDisabled}
      />
    </div>
  );
}

type TransactionInfoProps = {
  from: string;
  to: string;
  value: number;
};

function TransactionInfo(props: TransactionInfoProps) {
  return (
    <div className={styles.transactionInfo}>
      <label>Price</label>
      <span>TON</span>
      <label>Minimum Received</label>
      <span>
        {props.value} {props.to}
      </span>
      <label>Price Impact</label>
      <span>0.10%</span>
      <label>Liquidity Provider Fee</label>
      <span>0.002 TON</span>
    </div>
  );
}

interface ITokenItemProps {
  token: Token;
  amount: number;
}

function TokenItem({ token, amount }: ITokenItemProps) {
  return (
    <div className={styles.tokenItem}>
      <img alt={token.name} src={token.logoURI} />
      <span className={styles.amount}>{amount}</span>
      <span className={styles.name}>{token.symbol}</span>
    </div>
  );
}
function setState() {
  throw new Error("Function not implemented.");
}
