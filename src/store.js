import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import projectListReducer from "./features/projectListSlice";
import projectReducer from "./features/projectSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        projectList: projectListReducer,
        projectInfo: projectReducer,
    }
});