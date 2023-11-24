import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
