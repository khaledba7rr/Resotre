import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../../api/products/products";
import { uiSlice } from "./uiSlice";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const createWebStorage = () => {
  return {
    getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
    setItem: (key: string, value: string) =>
      Promise.resolve(window.localStorage.setItem(key, value)),
    removeItem: (key: string) =>
      Promise.resolve(window.localStorage.removeItem(key)),
  };
};

const storage = createWebStorage();

const persistConfig = {
  key: "ui",
  storage,
  whitelist: ["darkMode"],
};

const persistedUiReducer = persistReducer(persistConfig, uiSlice.reducer);

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    ui: persistedUiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
