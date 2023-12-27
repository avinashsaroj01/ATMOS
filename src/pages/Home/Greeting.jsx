import React, { useEffect, useState } from "react";
import styles from "./Home.module.css"

const Greeting = ({ user }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"]
    const [hourState, setHourState] = useState()
    const [minState, setMinState] = useState()
    const [secState, setSecState] = useState()
    const [greet, setGreet] = useState();
    const [monState, setMonState] = useState();
    const [dateState, setDateState] = useState();
    const [dayState, setDayState] = useState();

    const [userInfo, setUserInfo] = useState(user);

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            const hrs = date.getHours();
            if (hrs >= 0 && hrs < 12)
                setGreet("Good morning");
            else if (hrs >= 12 && hrs < 17)
                setGreet("Good afternoon")
            else if (hrs >= 17 && hrs < 19)
                setGreet("Good evening")
            else
                setGreet("Good night")
            setHourState(date.getHours());
            setMinState(date.getMinutes());
            setSecState(date.getSeconds());
            setMonState(date.getMonth());
            setDayState(date.getDay());
            setDateState(date.getDate());
        }, 10)
    }, [])

    return (

        <>
            <div className={styles.mainAreaGreeting}>
                <div className={styles.monthdiv}>
                    <h6 className={styles.monthHead}>{dayNames[dayState]}, {monthNames[monState]} {dateState}</h6>
                </div>
                <div className={styles.greetdiv}>
                    <h1 className={styles.mainGreetingHead}>{greet}, {userInfo.userName}</h1>
                </div>
                <div className={styles.timediv}>
                    <h4 className={styles.timeHead}>{hourState < 10 ? "0" + hourState : hourState}:{minState < 10 ? "0" + minState : minState}:{secState < 10 ? "0" + secState : secState}
                    </h4>
                </div>
            </div>
        </>
    )
}

export default Greeting;