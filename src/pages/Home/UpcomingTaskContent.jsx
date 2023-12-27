import { createStyles, Flex, Image, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

const useStyles = createStyles((theme) => ({
    projectContainer: {
        height: "100%",
        backgroundColor: '#f1f3f5',
        borderRadius: '0 0 10px 10px',
    },
}));


const UpcomingTaskContent = ({ taskList }) => {

    const { classes } = useStyles();

    const [upcomingTaskList, setUpcomingTaskList] = useState(null);

    useEffect(() => {
        const getUpcomingTask = taskList.map((task, index) => {
            // console.log(task.taskDeadline);
            if (task.taskDeadline != '1970-01-01T00:00:00.000Z' && task.taskCompletion == false) {
                if (new Date(task.taskDeadline) > new Date()) {
                    return task;
                }
            }
            return null;
        });
        //filter out null values
        const filteredUpcomingTaskList = getUpcomingTask.filter((task) => {
            return task !== null;
        });
        setUpcomingTaskList(filteredUpcomingTaskList);
    }, []);

    // console.log(overdueTaskList);



    return (
        <>
            {
                upcomingTaskList && upcomingTaskList.length > 0 ? (
                    <Paper m={0} p={0} pt={0} sx={classes.projectContainer}>
                        {upcomingTaskList.map((task, index) => {
                            return (
                                <TaskCard task={task} key={index} />
                            );
                        })}
                    </Paper>
                ) : (
                    <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} direction={'column'}>
                        <Image maw={120} mx="auto" radius="md" src="https://www.linkpicture.com/q/list.png" alt="Random image" />
                        <Text>No Upcoming Tasks</Text>
                    </Flex>
                )
            }
        </>
    );
}

export default UpcomingTaskContent;