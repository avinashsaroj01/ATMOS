import { createStyles, Flex, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import ChatEditor from "./ChatEditor";
import ChatFormat from "./ChatFormat";


const useStyles = createStyles((theme) => ({
    discussionWindow: {
        overflowY: 'scroll',
        flexDirection: 'column-reverse',
        // height: '100%',
        // maxHeight: '100%',
        // minHeight: '100%',
        //remove scrollbar
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        // justifyContent: 'flex-end',
    },
}));



const TaskModalDiscussion = ({ taskDiscussionId }) => {

    // console.log(taskDiscussion);
    const [discusssionThread, setDiscussionThread] = useState([]);
    const { classes } = useStyles();

    useEffect(() => {
        const getDiscussion = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/getDiscussionThread/${taskDiscussionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setDiscussionThread(data.discussion[0].discussionThread);
                // console.log(data.message);
                // console.log(data.discussion);
            }
            else {
                console.log(data.message);
            }
        }
        getDiscussion();
    }, [taskDiscussionId]);

    // console.log(discusssionThread, 'discussion thread');





    return (
        <>
            <Flex direction={'column'} justify={'end'} h={'100%'}>
                <Flex direction={'column'} p={20} sx={classes.discussionWindow}>
                    {discusssionThread.map((chat, index) => (
                        <ChatFormat
                            key={index}
                            postedAt={chat.createdAt}
                            body={chat.message}
                            author={chat.userId}
                            discussionThreadId={chat._id}
                            taskDiscussionId={taskDiscussionId}
                            setDiscussionThread={setDiscussionThread}
                        />
                    )).reverse()}
                </Flex>
                <Paper >
                    <ChatEditor
                        taskDiscussionId={taskDiscussionId}
                        setDiscussionThread={setDiscussionThread}
                    />
                </Paper>

            </Flex>
        </>
    );
}

export default TaskModalDiscussion;