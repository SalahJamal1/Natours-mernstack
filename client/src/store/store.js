import { configureStore } from "@reduxjs/toolkit";
import { Account } from "./Account";

export const store = configureStore({
  reducer: {
    Account: Account.reducer,
  },
});
