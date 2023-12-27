import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    userInfo: null,
};



// export const fetchUser = createAsyncThunk('user/fetchUser', async (email) => {
//     const response = await fetch('http://localhost:8000/userList?emailId=' + email);
//     const data = await response.json();
//     return data;
// });


export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        login: (state, action) => {
            // console.log("login action", action.payload);
            localStorage.setItem("token", action.payload.token);
            state.userInfo = action.payload.user;
            state.token = action.payload.token;
            console.log(state.userInfo);

        },
        logout: (state, action) => {
            localStorage.removeItem("user");
            state.user = null;
        },
        // addProjectToUser: (state, action) => {
        //     // state.user.projectIDList.push(action.payload);
        //     const userInfo = state.user;
        //     userInfo.projectIDList.push(action.payload);

        //     console.log("addProjectToUser userInfo", userInfo);
        //     console.log("addProjectToUser state", state.user);
        //     console.log("addProjectToUser action", action.payload);

        //     const res2 = fetch(`http://localhost:8000/userList/${state.user.id}`, {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(userInfo),
        //     }).then((res) => {
        //         // setIsPending(false);
        //         // setnextPage(1);
        //         // history("/projects");
        //         return res.json();
        //     });
        //     console.log(res2, 'userInfo');
        // },
        // addProjectToFavourite: (state, action) => {
        //     const projectId = action.payload;
        //     state.user.favoriteProjectList.push(projectId);
        //     fetch(`http://localhost:8000/userList/${state.user.id}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(state.user),
        //     }).then((result) => {
        //         return result.json();
        //     });

        // },
        // removeProjectFromFavourite: (state, action) => {
        //     const index = action.payload;
        //     state.user.favoriteProjectList.splice(index, 1);
        //     fetch(`http://localhost:8000/userList/${state.user.id}`, {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(state.user),
        //     }).then((result) => {
        //         return result.json();
        //     });
        // },
        // assignTaskToUser: (state, action) => {
        //     const taskId = action.payload;
        //     state.user.taskAssignedIDList.push(taskId);
        // },
        // removeTaskFromUser: (state, action) => {
        //     const taskId = action.payload;
        //     const index = state.user.taskAssignedIDList.indexOf(taskId);
        //     state.user.taskAssignedIDList.splice(index, 1);
        // },
        // removeProjectFromUser: (state, action) => {
        //     const projectId = action.payload;
        //     const index = state.user.projectIDList.indexOf(projectId);
        //     state.user.projectIDList.splice(index, 1);
        // }

    }
});

export const userInfo = (state) => state.user.user;
export const { login, logout, addProjectToUser, addProjectToFavourite, removeProjectFromFavourite, assignTaskToUser, removeTaskFromUser, removeProjectFromUser } = userSlice.actions;
export default userSlice.reducer;