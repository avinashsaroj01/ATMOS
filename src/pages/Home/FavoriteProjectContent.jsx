import { createStyles, Flex, Image, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const useStyles = createStyles((theme) => ({
    projectContainer: {
        height: "100%",
        backgroundColor: '#f1f3f5',
    },
}));

const FavoriteProjectContent = ({ userId, favProjectList }) => {

    // console.log(favProjectList);

    const { classes } = useStyles();

    return (
        <>
            {
                favProjectList && favProjectList.length > 0 ? (
                    <Paper m={0} p={0} pt={0} sx={classes.projectContainer}>
                        {favProjectList.map((project, index) => {
                            return (
                                <ProjectCard project={project} userId={userId} key={index} />
                            );
                        })
                        }
                    </Paper>
                ) :
                    (
                        <Flex w={'100%'} h={'100%'} align={'center'} justify={'center'} direction={'column'}>
                            <Image maw={120} mx="auto" radius="md" src="https://www.linkpicture.com/q/favorites.png" alt="Random image" />
                            <Text>No Favorite Projects</Text>
                        </Flex>

                    )

            }
        </>
    );
}

export default FavoriteProjectContent;