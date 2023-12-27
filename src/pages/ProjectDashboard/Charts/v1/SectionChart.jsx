import React, { useEffect, useState } from "react";
import styles from './SectionChart.mdoulde.css';

const SectionChart = ({ statsData, userInfo, projectInfo }) => {
    const [sectionInfo, setSectionInfo] = useState([]);

    //sectionName
    //sectionWiseData of task priority, task status, deadline

    const populateTask = (sec, task) => {
        // console.log(data);

        if (sec) {
            for (let i = 0; i < sec.length; i++) {

                for (let j = 0; j < sec[i].taskIDList.length; j++) {
                    sec[i].taskIDList[j] = task.find(
                        (element) => element.id === sec[i].taskIDList[j]
                    );
                }
            }

            // for(let i=0;i<userInfo)


        }
        // console.log("populated", sec);
        return sec;
    };
    //fetch request to get sectionList (At the moment this gets all the sections, In node it has to implemented in such a way that only sections of this specific section are send)

    useEffect(() => {
        fetch(`http://localhost:8000/sectionList?projectId_like=${projectInfo.id}`)
            .then((res) => {
                // console.log("sectionList fetched", res);
                if (!res.ok) {
                    throw Error("Not able to fetch the SectionList");
                }
                return res.json();
            })
            .then(async (sec) => {
                // console.log(sec);
                const task = await fetch("http://localhost:8000/taskList").then(
                    (res) => {
                        // console.log(res);
                        if (!res.ok) {
                            throw Error("Not able to fetch the TaskList");
                        }
                        return res.json();
                    }
                );
                return [sec, task];
            })
            // .then(([sec, task]) => {
            //     // console.log(sec, task);
            //     setTaskList(task);
            //     return [sec, task];
            // })
            .then(([sec, task]) => {
                // console.log(sec, task);
                sec = populateTask(sec, task);
                setSectionInfo(sec);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    console.log("sectionInfo", sectionInfo);

    //list of sections of particular user
    // const userSectionList = [];
    // for(let i=0;i<userInfo.sectionIDList.length;i++){
    //     const section = 
    // }



    return (
        <div className={styles.arenaBody}>
            <div className={styles.sectionFilter}></div>
            <div className={styles.sectionChartBody}></div>
        </div>
    );
}

export default SectionChart;