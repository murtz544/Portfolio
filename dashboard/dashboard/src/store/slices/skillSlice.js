import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const skillSlice = createSlice({
    name: "skill",
    initialState: {
        loading: false,
        error: null,
        skills: [],
        message: null
    },
    reducers: {
        getAllSkillsRequest(state, action){
            state.skills = [];
            state.loading = true;
            state.error = null;
        },
        getAllSkillsSuccess(state, action){
            state.skills = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllSkillsFailed(state, action){
            state.skills = state.skills;
            state.loading = false;
            state.error = action.payload;
        },
        addNewSkillRequest(state, action){
            state.message = null;
            state.loading = true;
            state.error = null;
        },
        addNewSkillSuccess(state, action){
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        addNewSkillFailed(state, action){
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },
        resetSkillSlice(state, action){
            state.skills = state.skills;
            state.loading = false;
            state.message = null;
            state.error = null;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.skills = state.skills;
        }
    }
});

export const getAllSkills = () => async (dispatch) => {
    dispatch(skillSlice.actions.getAllSkillsRequest());
    try {
        const {data} = await axios.get(
            "http://localhost:4000/api/v1/skill/getall",
            { withCredentials: true }
        );
        dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.getAllSkillsFailed(error.response.data.message));
    }
}

export const addNewSkill = (skills) => async (dispatch) => {
    dispatch(skillSlice.actions.addNewSkillRequest());
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/skill/add",
            skills,
            { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(response);
        console.log(response.data.message);
        dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
    }
}

export const clearAllSkillErrors = () => (dispatch) => {
    dispatch(skillSlice.actions.clearAllErrors());
};
export const resetSkillSlice = () => (dispatch) => {
    dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;