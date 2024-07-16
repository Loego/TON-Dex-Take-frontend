import { configureStore } from '@reduxjs/toolkit'
import modals from './reducers/modals'
import swap from './reducers/swap'
import tokens from './reducers/tokens'
import notifications from './reducers/notifications'
import account from './reducers/account'
import liquidity from './reducers/liquidity'
import info from './reducers/info'
import order from './reducers/order'

export const store = configureStore({
  reducer: {
    account,
    notifications,
    swap,
    modals,
    tokens,
    liquidity,
    info,
    order,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
