import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import UserDropdown from "./UserDropdown";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="head-container">
        <div className="head-atmos">
          <h1 className="ms-5" style={{ textTransform: "uppercase" }}>
            ATMOS
          </h1>
        </div>
        <div className="user">
          <UserDropdown />
        </div>
      </div>
      <div className="links ">
        <Link className="link" to="/home">
          Home
        </Link>
        <Link className="link" to="/projects">
          Projects
        </Link>
        <Link
          className="link"
          
          to="/messages"
        >
          Messages
        </Link>
        <Link className="link" to="/notes">
          Notes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
