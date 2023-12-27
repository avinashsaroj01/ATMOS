import React from "react"
import { useState } from "react"
import { useEffect } from "react";
import styles from "./Rightdiv.module.css";
const Rightdiv = () => {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 2000);
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className="right">
            <img className="project-img" alt="right-div" src={`./images/imgProject/business${time % 16}.jpg`} />
        </div>
    )
}

export default Rightdiv;