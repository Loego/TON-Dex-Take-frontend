import { configureStore } from "@reduxjs/toolkit";
import modals from "./reducers/modals";
import swap from "./reducers/swap";
import tokens from "./reducers/tokens";
import notifications from "./reducers/notifications";
import account from "./reducers/account";

export const store = configureStore({
  reducer: {
    account,
    swap,
    modals,
    tokens,
    notifications
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;