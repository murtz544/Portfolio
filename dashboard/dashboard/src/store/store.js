import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPassReducer from "./slices/forgotResetPasswordSlice";
import messagesReducer from "./slices/messagesSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPassReducer,
        messages: messagesReducer
    },
});

export default store;