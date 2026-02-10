import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from "./feature/counteState/CounterSlice";
import { productApi } from "./service/ProductApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice.reducer,
      [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(productApi.middleware);
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
