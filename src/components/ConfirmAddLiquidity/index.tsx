import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  confirmAddLiquidity,
  selectLiquidity,
} from '../../redux/reducers/liquidity'
import Button from '../Button'
import Header from './Header'
import styles from './index.module.scss'
import { useTonClient } from '../../hook/useTonClient'
import { useTonConnect } from '../../hook/useTonConnect'
import { checkTransactionStatus } from '../../api/swap'

var intervalId: string | number | NodeJS.Timeout | undefined
export default function ConfirmAddLiquidity() {
  const liquidityState = useAppSelector(selectLiquidity)
  const dispatch = useAppDispatch()

  const client = useTonClient()
  const { sender } = useTonConnect()

  const [isSent, setIsSent] = useState(false)
  const [txUrl, setTxUrl] = useState<string | null>(null)

  const preventClickThroughs = (e: React.MouseEvent<HTMLElement>) =>
    e.stopPropagation()

  if (liquidityState.token1 === null || liquidityState.token2 === null) {
    return null
  }

  const handleConfirmClick = () => {
    if (client && sender) dispatch(confirmAddLiquidity({ client, sender }))
  }

  useEffect(() => {
    if (liquidityState.txHash) {
      setIsSent(true)
      if (intervalId) clearInterval(intervalId)
      intervalId = setTimeout(async () => {
        if (liquidityState.txHash) {
          const isConfirmed = await checkTransactionStatus(
            liquidityState.txHash
          )

          if (isConfirmed) {
            setTxUrl(
              `${import.meta.env.VITE_TONVIEWER_URL}/transaction/${
                liquidityState.txHash
              }`
            )
          }
        }
      }, 1000)
    }
  }, [liquidityState.txHash])

  return !isSent ? (
    <div className={styles.container} onClick={preventClickThroughs}>
      <Header />
      <TransactionSummary />
      <Estimation />
      <TransactionInfo />
      <Button
        buttonType='primaryLarge'
        title='Confirm Supply'
        onClick={handleConfirmClick}
      />
    </div>
  ) : txUrl ? (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Transaction confirmed!</h2>
      </div>
      <div className={styles.transactionSummary}>
        <h3>
          Check transaction details{' '}
          <a href={txUrl} className='text-gray-500'>
            here
          </a>
        </h3>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Transaction sent for confirmation.</h2>
      </div>
      <div className={styles.transactionSummary}>
        <h3>Transaction will be processed in a few seconds...</h3>
      </div>
    </div>
  )
}

function TransactionSummary() {
  const {
    token1,
    token2,
    add: { position },
  } = useAppSelector(selectLiquidity)

  return (
    <div className={styles.transactionSummary}>
      <h1>{position?.liquidityTokens.toFixed(4) ?? 0}</h1>
      <img src={token1?.logoURI} alt={token1?.name} />
      <img src={token2?.logoURI} alt={token2?.name} />
      <span>
        {token1?.symbol}/{token2?.symbol} Pool Tokens
      </span>
    </div>
  )
}

function Estimation() {
  return (
    <p className={styles.estimation}>
      Estimated Output, Transaction will revert in case of more than{' '}
      <strong>0.8%</strong> price change.
    </p>
  )
}

function TransactionInfo() {
  const { token1, token2, inputs, conversionRate, add } =
    useAppSelector(selectLiquidity)

  return (
    <div className={styles.transactionInfo}>
      <label>{token1?.symbol} Deposited</label>
      <span>
        <img alt={token1?.name} src={token1?.logoURI} />
        {inputs.token1.toFixed(5)}
      </span>
      <label>{token2?.symbol} Deposited</label>
      <span>
        <img alt={token2?.name} src={token2?.logoURI} />
        {inputs.token2.toFixed(5)}
      </span>
      <label>Rate</label>
      <span>
        {conversionRate} {token1?.symbol}/{token2?.symbol}
      </span>
      {/* <label>Share of Pool</label>
      <span>{add.position?.share?.toFixed(5)}%</span> */}
    </div>
  )
}
