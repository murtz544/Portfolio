import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const softwareApplicationSlice = createSlice({
    name: "application",
    initialState:{
        loading: false,
        error: null,
        softwareApplications: [],
        message: null
    },
    reducers:{
        getAllSoftwareApplicationsRequest(state, action){
            state.softwareApplications = [];
            state.loading = true;
            state.error = null;
        },
        getAllSoftwareApplicationsSuccess(state, action){
            state.softwareApplications = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllSoftwareApplicationsFailed(state, action){
            state.softwareApplications = state.softwareApplications;
            state.loading = false;
            state.error = action.payload;
        },
        addNewSoftwareRequest(state, action){
            state.message = null;
            state.loading = true;
            state.error = null;
        },
        addNewSoftwareSuccess(state, action){
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        addNewSoftwareFailed(state, action){
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },
        deleteApplicationRequest(state, action){
            state.message = null;
            state.loading = true;
            state.error = null;
        },
        deleteApplicationSuccess(state, action){
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteApplicationFailed(state, action){
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },
        resetApplicationSlice(state, action){
            state.softwareApplications = state.softwareApplications;
            state.loading = false;
            state.message = null;
            state.error = null;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.softwareApplications = state.softwareApplications;
        }
    }
});

export const getAllApplications = () => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest());
    try {
        const {data} = await axios.get(
            "http://localhost:4000/api/v1/softwareapplication/getall",
            { withCredentials: true }
        );
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(data.softwareApplications));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(error.response.data.message));
    }
}

export const addNewApplication = (skills) => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.addNewSoftwareRequest());
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/softwareapplication/add",
            skills,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
        dispatch(softwareApplicationSlice.actions.addNewSoftwareSuccess(response.data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.addNewSoftwareFailed(error.response.data.message));
    }
}

export const deleteApplication = (id) => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.deleteApplicationRequest());
    try {
        const response = await axios.delete(
            `http://localhost:4000/api/v1/softwareapplication/delete/${id}`,
            { withCredentials: true }
        );
        dispatch(softwareApplicationSlice.actions.deleteApplicationSuccess(response.data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.deleteApplicationFailed(error.response.data.message));
    }
};

export const clearAllApplicationErrors = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
};
export const resetApplicationSlice = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.resetApplicationSlice());
};

export default softwareApplicationSlice.reducer;