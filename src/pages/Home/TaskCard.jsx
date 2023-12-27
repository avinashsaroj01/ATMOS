import { Group, Title, Text, Paper, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    projectContainer: {
        // display: "flex",
        // flexWrap: "wrap",
        width: "100%",
        // height: "100%",
        height: "fit-content",
        maxHeight: "450px",
        padding: theme.spacing.md,
        backgroundColor: '#f1f3f5',
        border: "1px solid transparent",
        // borderRadius: "8px",

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#ffffff',
            // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#f1f3f5',
            border: "1px solid #e7f5ff",
        },

    },
}));

const TaskCard = ({ task }) => {

    const { classes } = useStyles();
    const navigate = useNavigate();

    const dateFormatter = (date) => {
        if (date === '1970-01-01T00:00:00.000Z') {
            return 'No Deadline';
        }
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('en-GN');
    }


    const updateLastUsed = async (projectId) => {
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/project/updateLastUsed/${projectId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    updatedLastUsed: new Date(),
                })
            }
        );
        const data = await res.json();

    }

    const insideTask = (projectId) => {
        updateLastUsed(projectId);
        navigate(`/projects/${projectId}/board`);
    }

    return (
        <>
            <Paper p={5} m={0} mb={5} sx={classes.projectContainer} px={10} onClick={() => { insideTask(task.taskProjectId) }}>
                <Group position="apart">
                    <Text
                        sx={{ fontFamily: 'Poppins' }}
                        ta="center"
                        // fz="xl"
                        fw={600}
                        transform="capitalize"
                        color={"#05386b"}
                    >{task.taskName}</Text>
                    <Text
                        color={"#05386b"}
                        sx={{ fontFamily: 'Poppins' }}
                        size="sm"
                    >due: {dateFormatter(task.taskDeadline)}</Text>
                </Group>
            </Paper>
        </>
    );
}

export default TaskCard;