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

export default skillSlice.reducer;