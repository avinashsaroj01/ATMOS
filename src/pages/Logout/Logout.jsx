import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

const Logout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem("token");
        // dispatch(logout());
        navigate("/login");
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    )
}

export default Logout;