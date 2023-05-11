import { configureStore } from "@reduxjs/toolkit";

import liquidity from "./reducers/liquidity";
import modals from "./reducers/modals";
import swap from "./reducers/swap";
import tokens from "./reducers/tokens";
import notifications from "./reducers/notifications";

export const store = configureStore({
  reducer: {
    swap,
    modals,
    tokens,
    liquidity,
    notifications
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;