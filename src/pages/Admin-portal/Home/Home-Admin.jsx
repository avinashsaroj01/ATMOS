// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import "./home.scss";
import Widget from "../Components/Widget/Widget";
import Featured from "../Components/Featured/Featured";
import Chart from "../Components/Chart/Chart";
// import Table from "../../components/table/Table";

const HomeAdmin = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [sections, setSections] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getLengths() {
      const adminId = localStorage.getItem("adminId");
      const userRes2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${adminId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const userData2 = await userRes2.json();
      setUser(userData2.user);
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/admin/projects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const userRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/admin/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const taskRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/admin/tasks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const sectionRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/admin/sections", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      const userData = await userRes.json();
      const taskData = await taskRes.json();
      const sectionData = await sectionRes.json();
      setProjects(data.projects.length);
      setUsers(userData.users.length);
      setTasks(taskData.tasks.length);
      setSections(sectionData.sections.length);
    }
    getLengths();
  }, [projects, users, sections, tasks]);
  return (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="homeContainer">

        {user && <Navbar activeLink={"/admin-portal/"} user={user} />}
        {/* <Navbar2 /> */}
        {user && <div className="widgets">
          <Widget type="users" len={users} />
          <Widget type="projects" len={projects} />
          <Widget type="sections" len={sections} />
          <Widget type="tasks" len={tasks} />

        </div>}
        {user && <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Users)" aspect={2 / 1} />
        </div>}
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default HomeAdmin;
