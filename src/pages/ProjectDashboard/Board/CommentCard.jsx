import React from "react";
import styles from "./CommentArena.module.css";
import profilePic from '../../../images/profilepic.png';
// import Moment from 'react-moment';


const CommentCard = ({ comment }) => {

    // const getTime = (time) => {
    //     const newTime = moment.utc(time).local().startOf('seconds').fromNow();
    //     console.log(time);
    //     return newTime;
    // }

    const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTHS_OF_YEAR = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const daysBetween = (date1, date2) => {
        const ONE_DAY_ON_SECONDS = 1000 * 60 * 60 * 24;
        const date1Ms = date1.getTime();
        const date2Ms = date2.getTime();

        const differenceMs = date2Ms - date1Ms;
        return Math.round(differenceMs / ONE_DAY_ON_SECONDS);
    }

    const getHoursFromDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    const dateFromNow = (date) => {
        const currentDate = new Date();

        if (date.getUTCDate() === currentDate.getUTCDate() && date.getUTCMonth() === currentDate.getUTCMonth() && date.getUTCFullYear() === currentDate.getUTCFullYear()) {
            const hours = Math.floor(Math.abs(date - currentDate) / 36e5);

            if (hours === 0) {
                const minutes = Math.round(((Math.abs(date - currentDate) % 86400000) % 3600000) / 60000);
                return minutes <= 1 ? 'A while ago' : `${minutes} minutes ago.`
            } else {
                return `${Math.floor(hours)} hours ago`;
            }
        } else {
            if (date.getUTCFullYear() < currentDate.getUTCFullYear() || daysBetween(date, currentDate) > 6) {
                return `${date.getDate()}/${MONTHS_OF_YEAR[date.getMonth()]} /${date.getFullYear()}`;
            } else {
                return `${DAYS_OF_WEEK[date.getDay()]} at ${getHoursFromDate(date)}`;
            }
        }
    }

    const commentTimeFromNow = dateFromNow(new Date(comment.commentTime));
    console.log(commentTimeFromNow);


    return (
        <div className={styles.commentCard}>
            <div className={styles.commentHeader}>
                <div className={styles.profileSection}>
                    <img className={styles.profilePicImg} src={profilePic} alt="profile" />
                </div>
                <div className={styles.commentInfo}>
                    <div className={styles.commenterName}>
                        <p>{comment.commenter}</p>
                    </div>
                    <div className={styles.commentDate}>
                        {/* <Moment fromNow>{comment.commentTime}</Moment> */}
                        <p>{commentTimeFromNow}</p>
                    </div>
                </div>
            </div>
            <div className={styles.commentBody}>
                <p>{comment.comment}</p>
            </div>
            <div className={styles.commentFooter}>
                {/* button for later purposes */}
            </div>
        </div>
    );
}

export default CommentCard;