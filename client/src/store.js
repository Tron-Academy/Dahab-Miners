import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userProductSearchReducer from "./slices/userProductSearchSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProductSearch: userProductSearchReducer,
  },
});
