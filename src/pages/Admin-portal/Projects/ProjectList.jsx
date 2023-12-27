import Navbar from "../Components/Navbar/Navbar"
import Datatable from "../Components/Datatable/Datatable"
import { useEffect, useState } from "react";


const ProjectList = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState();

  useEffect(() => {
    async function getUser() {
      const adminId = localStorage.getItem("adminId");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${adminId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setUser(data.user);
      const pres = await fetch(process.env.REACT_APP_BACKEND_URL + "/admin/projects", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const pdata = await pres.json();
      setProjects(pdata.projects);
    }
    getUser();
  }, [projects]);

  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {user && <Navbar activeLink={"/admin-portal/projects"} user={user} />}
        {projects && <Datatable alldata={projects} type="projects" />}
      </div>
    </div>
  )
}

export default ProjectList