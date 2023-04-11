import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import niceThingReducer from "../features/niceThings/niceThingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        niceThing: niceThingReducer,
    },
});
