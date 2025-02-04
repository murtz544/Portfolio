import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        loading: false,
        error: null,
        messages: [],
        message: null
    },
    reducers: {
        getAllMessagesRequest(state, action){
            state.loading = true;
            state.error = null;
            state.messages = [];
        },
        getAllMessagesSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.messages = action.payload;
        },
        getAllMessagesFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.messages = state.messages;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.messages = state.messages;
        }
    }
});

export const getAllMessages = () => async(dispatch) => {
    dispatch(messagesSlice.actions.getAllMessagesRequest());
    try {
        const {data} = await axios.get(
            "http://localhost:4000/api/v1/message/getall",
            { withCredentials: true }
        );
        dispatch(messagesSlice.actions.getAllMessagesSuccess(data.messages));
        dispatch(messagesSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(messagesSlice.actions.getAllMessagesFailed(error.response.data.message));
    }
};

export default messagesSlice.reducer;