import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import menuReducer from "./features/menuSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
    },
});