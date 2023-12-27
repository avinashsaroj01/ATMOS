import { createStyles, Flex, Image, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";


const colorCodes = [
    '#ff6b6b',
    "#f06595",
    '#cc5de8',
    '#845ef7',
    '#5c7cfa',
    '#4dabf7',
];


const useStyles = createStyles((theme) => ({
    projectContainer: {
        height: "100%",
        backgroundColor: '#f1f3f5',
        borderRadius: '0 0 10px 10px',
    },
}));


const RecentProjectContent = ({ userId, projectList }) => {

    console.log(projectList);
    const [sortedProjectList, setSortedProjectList] = useState(null);

    const { classes } = useStyles();


    useEffect(() => {
        const sortedProjectList = projectList.sort((a, b) => {
            let aTimeDiff = 0;
            let bTimeDiff = 0;
            a.projectLastUsed.forEach((lastUsedObject) => {
                if (lastUsedObject.userid === userId) {
                    aTimeDiff = new Date() - new Date(lastUsedObject.lastUsed);
                }
            }
            );
            b.projectLastUsed.forEach((lastUsedObject) => {
                if (lastUsedObject.userid === userId) {
                    bTimeDiff = new Date() - new Date(lastUsedObject.lastUsed);
                }
            }
            );
            return aTimeDiff - bTimeDiff;
        });
        setSortedProjectList(sortedProjectList);
    }, []);

    return (
        <>
            {
                sortedProjectList && sortedProjectList.length > 0 ? (
                    <Paper m={0} p={0} pt={0} sx={classes.projectContainer}>
                        {sortedProjectList.map((project, index) => {
                            return (
                                <ProjectCard project={project} userId={userId} key={index} colorCode={colorCodes[index]} />
                            );
                        })
                        }
                    </Paper>
                ) :
                    (
                        <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} direction={'column'}>
                            <Image maw={120} mx="auto" radius="md" src="https://www.linkpicture.com/q/project-management.png" alt="Random image" />
                            <Text>No Recents Projects</Text>
                        </Flex>
                    )
            }
        </>
    );
}

export default RecentProjectContent;