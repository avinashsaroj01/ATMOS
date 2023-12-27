import React from "react";
import styles from "./CommentArena.module.css";
import CommentCard from "./CommentCard";
import profilePic from '../../../images/profilepic.png';


const CommentArena = ({ taskInfo, taskComments, setTaskComments, userInfo }) => {

    const [msg, setMsg] = React.useState("");

    console.log(userInfo);
    console.log(taskInfo);
    console.log(taskComments, "taskComment");
    const commentHandle = async (e) => {
        e.preventDefault();
        // console.log(msg);
        taskComments.push({
            comment: msg,
            commenter: userInfo.userName,
            commentTime: new Date().toLocaleString(),
            id: taskComments.length + 1,
        })
        taskInfo.taskComments = taskComments;
        console.log(taskInfo);
        const saveMsg = await fetch(`http://localhost:8000/taskList/${taskInfo.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskInfo),
        });
        const data = await saveMsg.json();
        console.log(data);
        setMsg("");
        setTaskComments(taskComments);
    }

    return (
        <div className={styles.commentArena} >
            <div className={styles.commentList}>
                {taskComments.length === 0 && <h1 className={styles.noCommentHeading}>No Comment Yet</h1>}
                {taskComments && taskComments.map((comment) => {
                    return <CommentCard comment={comment} key={comment.id} />
                })
                }
            </div>

            <div className={styles.writingArena}>
                <div className={styles.writingInput}>
                    {/* <div className={styles.profileSection}>
                        <img className={styles.profilePicImg} src={profilePic} alt="profile" />
                    </div> */}
                    <div className={styles.commentInput}>
                        <textarea className={styles.commentInputText} placeholder="Write a comment..." rows={1} onChange={(e) => { setMsg(e.target.value) }} value={msg} />
                    </div>
                </div>
                <div className={styles.commentButton}>
                    <button className={styles.commentButtonBtn} onClick={commentHandle}>Comment</button>
                </div>
            </div>

        </div>
    );
}

export default CommentArena;