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

const ProjectCard = ({ project, userId, colorCode }) => {

    const { classes } = useStyles();
    const navigate = useNavigate();

    let lastUsedTime = project.projectLastUsed.map((lastUsedObject) => {
        if (lastUsedObject.userid === userId) {
            // console.log(lastUsedObject.lastUsed, "lastUsedObject.lastUsed");
            return lastUsedObject.lastUsed;
        }
    }
    );
    lastUsedTime = lastUsedTime.filter((time) => time !== undefined);
    lastUsedTime = lastUsedTime[0];

    const dateFormatter = (date) => {
        const timeDiff = new Date() - new Date(date);
        // console.log(timeDiff, "timeDiff");
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        // console.log(days, hours, minutes, seconds);
        if (days > 0) {
            return `${days} day ago`;
        }
        else if (hours > 0) {
            return `${hours} hr ago`;
        }
        else if (minutes > 0) {
            return `${minutes} min ago`;
        }
        else if (seconds > 0) {
            return `${seconds} sec ago`;
        }
        else {
            return "just now";
        }
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

    const insideProject = async (projectId) => {
        updateLastUsed(projectId);
        navigate(`/projects/${projectId}/overview`);
    }


    return (
        <>
            <Paper p={5} m={0} mb={5} sx={classes.projectContainer} px={10} onClick={() => { insideProject(project._id) }}>
                <Group position="apart">
                    <Text
                        // variant="gradient"
                        // gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                        sx={{ fontFamily: 'Poppins' }}
                        ta="center"
                        // fz="xl"
                        fw={600}
                        transform="capitalize"
                        color={"#05386b"}

                    >{project.projectName}</Text>
                    <Text
                        color={"#05386b"}
                        sx={{ fontFamily: 'Poppins' }}
                        size="sm"
                    >last used: {dateFormatter(lastUsedTime)}</Text>
                </Group>
            </Paper>
        </>
    );
}

export default ProjectCard;