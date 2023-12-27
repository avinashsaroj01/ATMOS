import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectInfo: null
};

export const projectSlice = createSlice({
    name: "projectInfo",
    initialState,
    reducers: {
        setProject: (state, action) => {
            state.projectInfo = action.payload;
        },
        addMediumTeamMember: (state, action) => {
            state.projectInfo.mediumAccess.push(action.payload);
        },
        addHightTeamMember: (state, action) => {
            state.projectInfo.highAccess.push(action.payload);
        },
        addLowTeamMember: (state, action) => {
            state.projectInfo.lowAccess.push(action.payload);
        }
    }
});

export const selectedProject = (state) => state.projectInfo.projectInfo;
export const { setProject, addMediumTeamMember, addHightTeamMember, addLowTeamMember } = projectSlice.actions;
export default projectSlice.reducer;

