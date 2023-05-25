export type Modal = null|
                    "swap-selection"|
                    "swap-confirmation"|
                    "liquidity-selection"|
                    "confirm-supply"|
                    "confirm-remove"|
                    "exchange-setting"|
                    "swap-settings";
export interface ModalsState {
    shown: Modal;
}