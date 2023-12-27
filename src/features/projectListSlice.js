import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setProject } from "./projectSlice";




const initialState = {
    projectList: []
};


export const selectProjectById = (state, projectId) => {
    return state.projectList.find(project => project.id === projectId);
}

// const selectProject = ({ project }) => {
//     const dispatch = useDispatch();
//     dispatch(setProject(project));
// }

export const projectListSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: {
        setProjectList: (state, action) => {
            state.projectList = action.payload;
        },
        getProject: (state, action) => {
            console.log(state.projectList);

        },
        setLastUsed: (state, action) => {

            console.log(current(state.projectList));

            const { projectId } = action.payload;
            const project = state.projectList.find(project => project.id == Number(projectId));
            project.lastUsed = new Date().toString();
            console.log("setLastUsed project", current(project));
            console.log("setLastUsed state", current(state.projectList));
            fetch(`http://localhost:8000/projectList/${project.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project),
            }).then((result) => {
                return result.json();
            });
        }
    }


});

export const selectedProjectList = (state) => state.projectList.projectList;
export const { setProjectList, setLastUsed } = projectListSlice.actions;
export default projectListSlice.reducer;