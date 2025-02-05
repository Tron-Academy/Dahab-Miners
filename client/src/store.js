import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userProductSearchReducer from "./slices/userProductSearchSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProductSearch: userProductSearchReducer,
    admin: adminReducer,
  },
});
