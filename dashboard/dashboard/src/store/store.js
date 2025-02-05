import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotResetPassReducer from "./slices/forgotResetPasswordSlice";
import messagesReducer from "./slices/messagesSlice";
import timelineReducer from "./slices/timelineSlice";
import skillReducer from "./slices/skillSlice";
import softwareApplicationReducer from "./slices/softwareApplicationSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotResetPassReducer,
        messages: messagesReducer,
        timeline: timelineReducer,
        skill: skillReducer,
        application: softwareApplicationReducer
    },
});

export default store;