import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LogoutAdmin = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("adminId");
        // dispatch(logout());
        navigate("/admin-portal/login");
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

export default LogoutAdmin;