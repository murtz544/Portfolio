import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const projectSlice = createSlice({
    name: "project",
    initialState: {
        loading: false,
        error: null,
        projects: [],
        singleProject: {},
        message: null
    },
    reducers:{
        getAllProjectsRequest(state, action){
            state.projects = [];
            state.loading = true;
            state.error = null;
        },
        getAllProjectsSuccess(state, action){
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllProjectsFailed(state, action){
            state.projects = state.projects;
            state.loading = false;
            state.error = action.payload;
        },
        addNewProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewProjectSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewProjectFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteProjectSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteProjectFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        updateProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProjectSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        updateProjectFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetProjectSlice(state, action){
            state.projects = state.projects;
            state.loading = false;
            state.message = null;
            state.error = null;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.projects = state.projects;
        }
    }
});

export const getAllProjects = () => async (dispatch) => {
    dispatch(projectSlice.actions.getAllProjectsRequest());
    try {
        const {data} = await axios.get(
            "http://localhost:4000/api/v1/project/getall",
            { withCredentials: true }
        );
        dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectsFailed(error.message));
    }
}

export const addNewProject = (project) => async (dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const {data} = await axios.post(
            "http://localhost:4000/api/v1/project/add",
            project,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data"} }
        );
        dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.addNewProjectFailed(error.message));
    }
}

export const deleteProject = (projectId) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const {data} = await axios.delete(
            `http://localhost:4000/api/v1/project/delete/${projectId}`,
            { withCredentials: true }
        );
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectFailed(error.message));
    }
}

export const updateProject = (id, newData) => async (dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try {
        const { data } = await axios.put(`http://localhost:4000/api/v1/project/update/${id}`, newData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" }
        })
        dispatch(projectSlice.actions.updateProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message));
    }
}

export const clearAllProjectErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors());
};

export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;