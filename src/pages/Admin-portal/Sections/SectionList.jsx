import Navbar from "../Components/Navbar/Navbar"
import Datatable from "../Components/Datatable/Datatable"
import { useEffect, useState } from "react";


const SectionList = () => {
  const [user, setUser] = useState();
  const [sections, setSections] = useState();

  useEffect(() => {
    async function getUser() {
      const adminId = localStorage.getItem("adminId");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${adminId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setUser(data.user);
      const pres = await fetch(process.env.REACT_APP_BACKEND_URL + "/admin/sections", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const pdata = await pres.json();
      setSections(pdata.sections);
    }
    getUser();
  }, [user, sections]);

  return (
    <div className="list">
      {/* <Sidebar/> */}
      <div className="listContainer">
        {user && <Navbar activeLink={"/admin-portal/sections"} user={user} />}
        {sections && <Datatable alldata={sections} type="sections" />}
      </div>
    </div>
  )
}

export default SectionList