import React from "react";
import styles from './CountChart.module.css';

const CountChart = ({ statsData, userInfo, projectInfo }) => {
    // console.log(userInfo);






    return (
        <>
            <div className={styles.countContainer}>
                <div className={styles.containerHead}>
                    <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/to-do.png" /></div>

                    <div className={styles.headText}>Completed Task</div>
                </div>
                <div className={styles.containerBody}>
                    <p className={styles.para}>
                        {statsData.completed}
                    </p>
                </div>
                <div className={styles.containerFoot}>
                    <p className={styles.para}>
                        <span>{statsData.completed / statsData.total * 100}%</span> task completed
                    </p>
                </div>
            </div>
            <div className={styles.countContainer}>
                <div className={styles.containerHead}>
                    <div className={styles.headIcon}><img src="https://img.icons8.com/material-rounded/24/000000/tasklist.png" /></div>
                    <div className={styles.headText}>Pending Task</div>
                </div>
                <div className={styles.containerBody}>
                    <p className={styles.para}>
                        {statsData.notCompleted}
                    </p>
                </div>
                <div className={styles.containerFoot}>
                    <p className={styles.para}>
                        <span>{statsData.notCompleted / statsData.total * 100}%</span> task pending
                    </p>
                </div>
            </div>
            <div className={styles.countContainer}>
                <div className={styles.containerHead}>
                    <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/todo-list--v1.png" /></div>
                    <div className={styles.headText}>Missed Deadline</div>
                </div>
                <div className={styles.containerBody}>
                    <p className={styles.para}>
                        {statsData.overdue}
                    </p>
                </div>
                <div className={styles.containerFoot}>
                    <p className={styles.para}>
                        <span>{statsData.overdue / statsData.total * 100}%</span> task overdue
                    </p>
                </div>
            </div>
            <div className={styles.countContainer}>
                <div className={styles.containerHead}>
                    <div className={styles.headIcon}><img src="https://img.icons8.com/ios-glyphs/30/000000/todo-list--v1.png" /></div>
                    <div className={styles.headText}>Total</div>
                </div>
                <div className={styles.containerBody}>
                    <p className={styles.para}>
                        {statsData.total}
                    </p>
                </div>
                {/* <div className={styles.containerFoot}>
                    <p className={styles.para}>
                        <span>{statsData.overdue / statsData.total * 100}%</span> task overdue
                    </p>
                </div> */}
            </div>
        </>
    );
}

export default CountChart;