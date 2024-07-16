export type Modal =
  | null
  | 'order-selection'
  | 'swap-selection'
  | 'swap-confirmation'
  | 'liquidity-selection'
  | 'confirm-supply'
  | 'confirm-remove'
  | 'exchange-setting'
  | 'swap-settings'
  | 'order-confirmation'
export interface ModalsState {
  shown: Modal
}
