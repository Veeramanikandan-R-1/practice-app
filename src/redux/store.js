import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducers/counterSlice";

const store = configureStore({
  reducer: combineReducers({
    counter: counterSlice,
  }),
});

export default store;
