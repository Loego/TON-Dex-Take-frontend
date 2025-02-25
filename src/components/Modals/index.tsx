import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeToken as changeLiquidityToken,
  selectLiquidity,
} from '../../redux/reducers/liquidity'
import { selectModals, showModal } from '../../redux/reducers/modals'
import {
  changeToken as changeOrderToken,
  selectOrder,
} from '../../redux/reducers/order'
import {
  changeToken as changeSwapToken,
  selectSwap,
} from '../../redux/reducers/swap'
import { TokenBalanced } from '../../redux/types/tokens'
import SelectionModal from '../SelectionModal'
import ConfirmAddLiquidity from '../ConfirmAddLiquidity'
import ConfirmRemoveLiquidity from '../ConfirmRemoveLiquidity'
import ConfirmSwapModal from '../ConfirmSwapModal'

import SwapSettingsModal from '../SwapSettingsModal'
import styles from './index.module.scss'
import ConfirmOrderModal from '../ConfirmOrderModal'

export default function Modals() {
  const modalsState = useAppSelector(selectModals)
  const { selectionModal: orderModal } = useAppSelector(selectOrder)
  const { selectionModal: swapModal } = useAppSelector(selectSwap)
  const { selectionModal: liquidityModal } = useAppSelector(selectLiquidity)
  const dispatch = useAppDispatch()
  const handleDismiss = () => dispatch(showModal(null))

  const handleOrderSelection = (token: TokenBalanced) => {
    dispatch(changeOrderToken({ key: orderModal ?? 'from', value: token }))
  }
  const handleSwapSelection = (token: TokenBalanced) => {
    dispatch(changeSwapToken({ key: swapModal ?? 'from', value: token }))
  }
  const handleLiquiditySelection = (token: TokenBalanced) => {
    dispatch(
      changeLiquidityToken({ key: liquidityModal ?? 'token1', value: token })
    )
  }

  return (
    <CSSTransition
      in={modalsState.shown !== null}
      timeout={500}
      classNames={{
        enter: styles.containerEnter,
        enterActive: styles.containerEnterActive,
        exit: styles.containerExit,
        exitActive: styles.containerExitActive,
      }}
      unmountOnExit
    >
      <div className={styles.container} onClick={handleDismiss}>
        {modalsState.shown === 'order-selection' ? (
          <SelectionModal onSelected={handleOrderSelection} />
        ) : modalsState.shown === 'swap-selection' ? (
          <SelectionModal onSelected={handleSwapSelection} />
        ) : modalsState.shown === 'liquidity-selection' ? (
          <SelectionModal onSelected={handleLiquiditySelection} />
        ) : modalsState.shown === 'swap-confirmation' ? (
          <ConfirmSwapModal />
        ) : modalsState.shown === 'confirm-supply' ? (
          <ConfirmAddLiquidity />
        ) : modalsState.shown === 'confirm-remove' ? (
          <ConfirmRemoveLiquidity />
        ) : modalsState.shown === 'swap-settings' ? (
          <SwapSettingsModal />
        ) : modalsState.shown === 'order-confirmation' ? (
          <ConfirmOrderModal />
        ) : null}
      </div>
    </CSSTransition>
  )
}
