import React, { useEffect, useState } from "react";
import styles from './Charts.module.css';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import CountChart from "./CountChart";
import { Bar } from 'react-chartjs-2';
import SectionChart from "./SectionChart";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Charts = ({ projectID, projectInfo, setProjectInfo, userInfoOfUser }) => {
    const [user, setUser] = useState(userInfoOfUser);
    console.log(user, 'from charts');

    const [userInfo, setUserInfo] = useState(null);
    const [statsData, setStatsData] = useState({
        completed: 0,
        notCompleted: 0,
        overdue: 0,
        total: 0,
        highPriority: 0,
        mediumPriority: 0,
        lowPriority: 0,
        onTrack: 0,
        OffTrack: 0,
        atRisk: 0,
        highPriorityCompleted: 0,
        mediumPriorityCompleted: 0,
        lowPriorityCompleted: 0,
        highPriorityNotCompleted: 0,
        mediumPriorityNotCompleted: 0,
        lowPriorityNotCompleted: 0,
    });
    // console.log(user);
    // console.log(projectInfo);

    async function getTaskInfo(taskId) {
        const res = await fetch(`http://localhost:8000/taskList/${taskId}`);
        const data = await res.json();
        return data;
    }

    async function populateTaskInfo() {
        const userData = await JSON.parse(JSON.stringify(user));
        for (let i = 0; i < userData.taskAssignedIDList.length; i++) {
            userData.taskAssignedIDList[i] = await getTaskInfo(user.taskAssignedIDList[i]);
        }
        return userData;
    }

    const getStats = (userInfo) => {
        //completedCount
        // console.log(userInfo.taskAssignedIDList, 'in');

        const stats = {
            completed: 0,
            notCompleted: 0,
            overdue: 0,
            total: 0,
            highPriority: 0,
            mediumPriority: 0,
            lowPriority: 0,
            onTrack: 0,
            OffTrack: 0,
            atRisk: 0,
            highPriorityCompleted: 0,
            mediumPriorityCompleted: 0,
            lowPriorityCompleted: 0,
            highPriorityNotCompleted: 0,
            mediumPriorityNotCompleted: 0,
            lowPriorityNotCompleted: 0,
        }

        let count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            // console.log(userInfo.taskAssignedIDList[i].taskCompletion);
            if (userInfo.taskAssignedIDList[i].taskCompletion === true) {
                count++;
            }
        }
        stats.completed = count;
        stats.total = userInfo.taskAssignedIDList.length;
        stats.notCompleted = stats.total - stats.completed;

        //overdueCount
        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskDeadline && userInfo.taskAssignedIDList[i].taskCompletion === false && (new Date(userInfo.taskAssignedIDList[i].taskDeadline) < Date.now())) {
                count++;
            }
        }
        stats.overdue = count;

        //priorityCount
        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "high") {
                count++;
            }
        }
        stats.highPriority = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "medium") {
                count++;
            }
        }
        stats.mediumPriority = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "low") {
                count++;
            }
        }
        stats.lowPriority = count;

        //statusCount
        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskStatus === "on-track") {
                count++;
            }
        }
        stats.onTrack = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskStatus === "Off-track") {
                count++;
            }
        }
        stats.offTrack = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskStatus === "at-risk") {
                count++;
            }
        }
        stats.atRisk = count;

        //completedPriorityCount
        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "high" && userInfo.taskAssignedIDList[i].taskCompletion === true) {
                count++;
            }
        }
        stats.highPriorityCompleted = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "medium" && userInfo.taskAssignedIDList[i].taskCompletion === true) {
                count++;
            }
        }
        stats.mediumPriorityCompleted = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "low" && userInfo.taskAssignedIDList[i].taskCompletion === true) {
                count++;
            }
        }
        stats.lowPriorityCompleted = count;

        //notCompletedPriorityCount
        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "high" && userInfo.taskAssignedIDList[i].taskCompletion === false) {
                count++;
            }
        }
        stats.highPriorityNotCompleted = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "medium" && userInfo.taskAssignedIDList[i].taskCompletion === false) {
                count++;
            }
        }
        stats.mediumPriorityNotCompleted = count;

        count = 0;
        for (let i = 0; i < userInfo.taskAssignedIDList.length; i++) {
            if (userInfo.taskAssignedIDList[i].taskPriority === "low" && userInfo.taskAssignedIDList[i].taskCompletion === false) {
                count++;
            }
        }
        stats.lowPriorityNotCompleted = count;

        return stats;
    }


    useEffect(() => {

        async function populateTaskInfo() {
            const userData = await JSON.parse(JSON.stringify(user));
            for (let i = 0; i < userData.taskAssignedIDList.length; i++) {
                userData.taskAssignedIDList[i] = await getTaskInfo(user.taskAssignedIDList[i]);
            }
            // return userData;

            setUserInfo(userData);
            setStatsData(getStats(userData));
        }
        populateTaskInfo();
        // console.log(info, 'info');
        // setUserInfo(info);
    }, []);

    // userInfo && console.log(userInfo);

    const priorityOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const statusOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    const priorityLabels = ['High', 'Medium', 'Low'];
    const statusLabels = ['On Track', 'Off Track', 'At Risk'];

    const statusData = {
        labels: statusLabels,
        datasets: [
            {
                label: 'number of task',
                data: [statsData.onTrack, statsData.offTrack, statsData.atRisk],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ],
    }

    const priorityData = {
        labels: priorityLabels,
        datasets: [
            {
                label: 'Total Tasks',
                data: priorityLabels.map((label) => {
                    if (label === 'High') {
                        return statsData.highPriority;
                    }
                    if (label === 'Medium') {
                        return statsData.mediumPriority;
                    }
                    if (label === 'Low') {
                        return statsData.lowPriority;
                    }
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Completed Tasks',
                data: priorityLabels.map((label) => {
                    if (label === 'High') {
                        return statsData.highPriorityCompleted;
                    }
                    if (label === 'Medium') {
                        return statsData.mediumPriorityCompleted;
                    }
                    if (label === 'Low') {
                        return statsData.lowPriorityCompleted;
                    }
                }),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: 'Pending Tasks',
                data: priorityLabels.map((label) => {
                    if (label === 'High') {
                        return statsData.highPriorityNotCompleted;
                    }
                    if (label === 'Medium') {
                        return statsData.mediumPriorityNotCompleted;
                    }
                    if (label === 'Low') {
                        return statsData.lowPriorityNotCompleted;
                    }
                }),
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            }
        ],
    };
    // console.log(priorityData.datasets[0].data, 'data');
    console.log(userInfo, 'userInfo');
    console.log(statsData, 'statsData');

    return (
        <div className={styles.mainView}>
            <div className={styles.chartArena}>
                <div className={styles.arenaHeading}>
                    <h3>Status</h3>
                </div>
                <div className={`${styles.arenaBody}, ${styles.statusArenaBody}`} >
                    {/* {console.log(userInfo)} */}
                    {userInfo && <CountChart
                        statsData={statsData}
                        userInfo={userInfo}
                        projectInfo={projectInfo}
                    />}
                </div>
            </div>
            <div className={styles.chartArena}>
                <div className={styles.arenaHeading}>
                    <h3>Priority</h3>
                </div>
                <div className={styles.arenaBody}>
                    <Bar data={priorityData} options={priorityOptions} />
                </div>
            </div>
            <div className={styles.chartArena}>
                <div className={styles.arenaHeading}>
                    <h3>Status</h3>
                </div>
                <div className={styles.arenaBody}>
                    <Bar data={statusData} options={statusOptions} />
                </div>
            </div>
            {/* <div className={`${styles.chartArena} ${styles.sectionWiseArena}`}>
                <div className={styles.arenaHeading}>
                    <h3>Section Wise Metrics</h3>
                </div>
                <div className={styles.arenaBody}>
                    <SectionChart
                        statsData={statsData}
                        userInfo={userInfo}
                        projectInfo={projectInfo}
                    />
                </div>
            </div> */}





        </div >
    );
}

export default Charts;
