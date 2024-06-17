import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice.js";
import { version } from "mongoose";

const rootReducer = combineReducers({ user: useReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer({ persistConfig, rootReducer });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
