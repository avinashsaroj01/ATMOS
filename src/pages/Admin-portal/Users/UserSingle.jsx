import "./usersingle.scss";
import Navbar from "../Components/Navbar/Navbar";
import Chart from "../Components/Chart/Chart";
import List from "../Components/Table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserSingle = () => {
  const [user, setUser] = useState();
  const [projects, setProjects] = useState();

  const { id } = useParams();

  useEffect(() => {
    async function getUser() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/users/${id}`, {
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
  }, [user, projects]);


  return (
    <div className="single">
      {/* <Sidebar /> */}
      <div className="singleContainer">
        {/* <Navbar activeLink={"/"} user={user} /> */}
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Tasks ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Recent Projects</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default UserSingle;
