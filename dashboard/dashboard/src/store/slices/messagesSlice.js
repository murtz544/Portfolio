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
        deleteMessagesRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteMessagesSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteMessagesFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetMessageSlice(state, action){
            state.error = null;
            state.messages = state.messages;
            state.message = null;
            state.loading = false;
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
            "https://portfolio-backend-code-kwdg.onrender.com/api/v1/message/getall",
            { withCredentials: true }
        );
        dispatch(messagesSlice.actions.getAllMessagesSuccess(data.messages));
        dispatch(messagesSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(messagesSlice.actions.getAllMessagesFailed(error.response.data.message));
    }
};

export const deleteMessages = (id) => async(dispatch) => {
    dispatch(messagesSlice.actions.deleteMessagesRequest());
    try {
        const {data} = await axios.delete(
            `https://portfolio-backend-code-kwdg.onrender.com/api/v1/message/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(messagesSlice.actions.deleteMessagesSuccess(data.message));
        dispatch(messagesSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(messagesSlice.actions.deleteMessagesFailed(error.response.data.message));
    }
};

export const clearAllMessageErrors = () => (dispatch) => {
    dispatch(messagesSlice.actions.clearAllErrors());
};

export const resetMessageSlice = () => (dispatch) => {
    dispatch(messagesSlice.actions.resetMessageSlice());
};

export default messagesSlice.reducer;