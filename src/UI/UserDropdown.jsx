import React from "react"
import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';

const UserDropdown = () => {
    return (
        <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
            <img className="user-img rounded-circle" style={{width: "40px"}} alt="user" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/admin-portal">Admin Portal</Link></Dropdown.Item>
            <Dropdown.Item><Link to="/logout">Log Out</Link></Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserDropdown;