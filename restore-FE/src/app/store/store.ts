import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../../api/products/products-queries";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelectorr = useSelector.withTypes<RootState>();
