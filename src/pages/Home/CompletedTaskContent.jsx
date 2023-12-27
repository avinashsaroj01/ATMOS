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


const CompletedTaskList = ({ taskList }) => {

    const { classes } = useStyles();

    const [completedTaskList, setCompletedTaskList] = useState(null);

    useEffect(() => {
        const getCompletedTaskList = taskList.map((task, index) => {
            // console.log(task.taskDeadline);
            if (task.taskCompletion) {
                return task;
            }
            return null;
        });
        //filter out null values
        const filteredCompletedTaskList = getCompletedTaskList.filter((task) => {
            return task !== null;
        });
        setCompletedTaskList(filteredCompletedTaskList);
    }, []);

    console.log(completedTaskList);



    return (
        <>
            {
                completedTaskList && completedTaskList.length > 0 ? (
                    <Paper m={0} p={0} pt={0} sx={classes.projectContainer}>
                        {completedTaskList.map((task, index) => {
                            return (
                                <TaskCard task={task} key={index} />
                            );
                        })}
                    </Paper>
                ) : (
                    <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} direction={'column'}>
                        <Image maw={120} mx="auto" radius="md" src="https://www.linkpicture.com/q/list.png" alt="Random image" />
                        <Text>No Completed Tasks</Text>
                    </Flex>
                )
            }
        </>
    );
}

export default CompletedTaskList;