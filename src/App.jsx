import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
import Home from "./pages/Home/Home";
import io from "socket.io-client";
import HomePage from "./pages/HomePage/Home";
import Projects from "./pages/Projects/Projects";
import Chats from "./pages/Messages/chat";
// import Notes from "./pages/Notes/Notes";
import ProjectMainView from "./pages/ProjectDashboard/ProjectMainView";
import CreateProject from "./pages/Projects/CreateProject";
import SignUp from "./pages/Sign-Up/Sign-Up";
import Login from "./pages/Login/Login";
import UserProfile from "./pages/UserProfile/UserProfile";
import Logout from "./pages/Logout/Logout";
// import Dashboard from "./pages/Admin/Dashboard";
import HomeAdmin from "./pages/Admin-portal/Home/Home-Admin";
import UserList from "./pages/Admin-portal/Users/UserList";
import UserSingle from "./pages/Admin-portal/Users/UserSingle";
import ProjectList from "./pages/Admin-portal/Projects/ProjectList";
import TaskList from "./pages/Admin-portal/Tasks/TaskList";
import SectionList from "./pages/Admin-portal/Sections/SectionList";
import LoginAdmin from "./pages/Admin-portal/Login/LoginAdmin";
import LogoutAdmin from "./pages/Admin-portal/Login/LogoutAdmin";
import AboutUS from "./pages/AboutUs/AboutUs";
import Contact from "./pages/ContactUs/Contact";
import Notes from "./pages/Notes/Notes";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import NoteEditor from "./pages/Notes/NoteEditor";
import Page404 from "./pages/Extra/Page404";
// 6,50,000 + 2,50,000 + 1,00,000 + 9,10,000 + 1,00,000

// 40,000 + 35,000 + 
// const socket = io.connect("http://localhost:4001/message");


const App = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getUser() {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/user/getUserInfo", {
        method: "GET",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(data, "userInfo from appJS");
      data["token"] = token;
      dispatch(login(data));
    }
    if (token) {
      getUser();
    }
  }, []);
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/message" element={<Chats />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route
              exact
              path="/projects/:id/board"
              element={<ProjectMainView Board />}
            />
            <Route exact path="/noteeditor/:id" element={<NoteEditor />} />
            <Route
              exact
              path="/projects/:id/overview"
              element={<ProjectMainView Overview />}
            />
            <Route
              exact
              path="/projects/:id/charts"
              element={<ProjectMainView Charts />}
            />
            <Route
              exact
              path="/projects/:id/timeline"
              element={<ProjectMainView Timeline />}
            />
            <Route path="/admin-portal" element={<HomeAdmin />} />
            <Route exact path="/admin-portal/users" element={<UserList />} />
            <Route exact path="/admin-portal/users/:id" element={<UserSingle />} />
            <Route exact path="/admin-portal/projects" element={<ProjectList />} />
            <Route exact path="/admin-portal/tasks" element={<TaskList />} />
            <Route exact path="/admin-portal/sections" element={<SectionList />} />
            <Route exact path="/admin-portal/login" element={<LoginAdmin />} />
            <Route exact path="/admin-portal/logout" element={<LogoutAdmin />} />
            <Route exact path="/aboutUs" element={<AboutUS />} />
            <Route exact path="/contactUs" element={<Contact />} />

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
