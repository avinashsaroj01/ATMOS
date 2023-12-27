import styles from "./CompletedTask.module.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CompletedTask = ({ user }) => {
  const [tasksList, setTasksList] = useState();

  const dateFormater = (date) => {
    let newDate = new Date(date);
    const offset = newDate.getTimezoneOffset();
    newDate = new Date(newDate.getTime() - offset * 60 * 1000);
    return newDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const getTaskLists = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/task/getTaskList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setTasksList(data.Tasks);
      }
    };
    getTaskLists();
  }, []);

  var sortedTaskList = tasksList;
  const compareDate = (a, b) => {
    var c = new Date(a.taskDeadline);
    var d = new Date(b.taskDeadline);
    if (c >= d) return 1;
    else return -1;
  };

  const sortTaskList = () => {
    sortedTaskList = tasksList.sort(compareDate);
  };

  tasksList && sortTaskList();

  let showImg = true;

  return (
    <>
      <div className={styles.completedTaskList}>
        {sortedTaskList &&
          sortedTaskList.map(
            (task) =>
              task.taskCompletion && (
                <div className={styles.particularTask}>
                  <Link to="/projects">
                    <div className={styles.projectDiv}>
                      <div className={styles.projectInfoName}>
                        <h4 className={styles.projectName}>{task.taskName}</h4>
                      </div>
                      <div className={styles.projectInfoLastUsed}>
                        <p className={styles.lastUsed}>
                          due: {dateFormater(task.taskDeadline)}
                          {(showImg = false)}
                        </p>
                      </div>
                    </div>
                    {/* <h6 className={styles.particularTaskName}>
                        <div className={styles.taskName}>

                        </div>
                        <div className={styles.taskTime}>

                        </div>
                      </h6> */}
                  </Link>
                </div>
              )
          )}
        {showImg && (
          <div className={styles.mainTask}>
            <div className={styles.noTask}>
              <img
                className={styles.noTaskImg}
                src="https://www.linkpicture.com/q/list.png"
              ></img>
            </div>
            <div className={styles.noTaskText}>
              <p className={styles.upperTaskTxt}>You don't have</p>
              <p className={styles.lowerTaskTxt}> any Completed Task </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedTask;
