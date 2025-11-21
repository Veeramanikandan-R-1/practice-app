import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

import taskSlice from "./reducers/taskSlice.js";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["tasks", "theme"],  // choose which slices to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    tasks: taskSlice,
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
