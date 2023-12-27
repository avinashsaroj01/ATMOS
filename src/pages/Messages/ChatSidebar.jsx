import React, { useState, useEffect } from "react"
import { createStyles, Flex, Paper, Text } from '@mantine/core';
import { Group, Avatar, Accordion } from '@mantine/core';
import { List, ThemeIcon, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: theme.spacing.md,
        height: '50px',

        // border: '1px solid rgba(206, 201, 201, 0.7)',
        // borderRadius: '5px',
        // margin: '5px 0 5px 0',

        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },
}));

const ChatSidebar = ({ chat, currentUserId }) => {
    // console.log("sidebar",projects)

    const { classes } = useStyles();
    console.log(chat)
    const [projectData, setProjectData] = useState(null)
    const [collaborators, setCollaborators] = useState([])
    useEffect(() => {
        const projectId = chat.projectId;
        const getProjectData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/getProjectDetails/${projectId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setProjectData(data.project);
                // console.log("this is",data)
                let collaborator = []
                data.project.projectHighAccessMembers.map(collab => {
                    if(collab._id === currentUserId){
                        collaborator.push("You")
                    }
                    else{
                        collaborator.push(collab.userName)
                    }
                })
                data.project.projectMediumAccessMembers.map(collab => {
                    collaborator.push(collab.userName)
                })
                data.project.projectLowAccessMembers.map(collab => {
                    collaborator.push(collab.userName)
                })
                setCollaborators(collaborator)
            } catch (error) {
                console.log(error)
            }
        }
        getProjectData()
    }, [chat])

    return (
        <>
            <div style={{ paddingLeft: '20px' }}>
                <Text size="sm" weight={500}>
                    Project Description:
                </Text>
                <Text size="sm" weight={500}>
                    {projectData && projectData.projectDescription}
                </Text>
            </div>
            <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
                <Text size="sm" weight={500}>
                    Collaborators:
                </Text>
                {collaborators && collaborators.map((collaborator) => {
                    return (
                        <Text size="sm" weight={500}>
                            {collaborator}
                        </Text>
                    )
                })}
            </div>
        </>
    )
}


export default ChatSidebar;