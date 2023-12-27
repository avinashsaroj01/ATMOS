import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    Title,
    Header,
    Flex,
    // rem
} from '@mantine/core';
import {
    IconStar,
    IconArrowLeft,
    IconBook2,
    IconStarFilled,
    IconNotebook,
    IconLayoutKanban,
    IconChartHistogram,
    IconTimeline
} from '@tabler/icons-react';
import ProfileMenu from "../../../UI/ProfileMenu";

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `$16px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
            }`,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: '38*16px',
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    },

}));


const ProjectInfoBar_v2 = ({
    projectInfo,
    setProjectInfo,
    userInfo,
    setUserInfo,
    activeTab,
    setActiveTab,
}) => {

    const navigate = useNavigate();
    // console.log(userInfo, 'user from ProjectInfoBar_v2');
    // console.log(userInfo.favProjectIdList, 'userInfo from ProjectInfoBar_v2');

    const isProjectFavorite = userInfo.favProjectIdList.map((project) => project._id).includes(projectInfo._id);
    // const isProjectFavorite = userInfo.favProjectIdList.includes(projectInfo._id);

    // console.log(isProjectFavorite, 'isProjectFavorite from ProjectInfoBar_v2');

    const { classes, theme } = useStyles();
    const [isStarred, setIsStarred] = useState(isProjectFavorite);

    const [user, setUser] = useState({
        ...userInfo,
        "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
    });

    // console.log(user, 'user from ProjectInfoBar_v2');

    const backToProjects = () => {
        navigate('/projects');
    }



    const items = ['Overview', 'Board', 'Charts'].map((tab) => (
        <Tabs.Tab value={tab} key={tab}>
            {/* <Flex align={'center'} > */}
            {tab === 'Overview' && <IconNotebook size={20} />}
            {tab === 'Board' && <IconLayoutKanban size={20} />}
            {tab === 'Charts' && <IconChartHistogram size={20} />}
            {/* {tab === 'Timeline' && <IconTimeline size={20} />} */}

            {tab}
            {/* </Flex> */}
        </Tabs.Tab>
    ));

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        switch (tab) {
            case 'Overview':
                navigate(`/projects/${projectInfo._id}/overview`);
                break;
            case 'Board':
                navigate(`/projects/${projectInfo._id}/board`);
                break;
            case 'Charts':
                navigate(`/projects/${projectInfo._id}/charts`);
                break;
            case 'Timeline':
                navigate(`/projects/${projectInfo._id}/timeline`);
                break;
            default:
                break;
        }
    }

    const handleFavoriteClick = async (e) => {
        e.stopPropagation();
        // console.log('handleFavoriteClick');

        if (isStarred) {
            const newFavProjectIdList = userInfo.favProjectIdList.filter(id => id !== projectInfo._id);


            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/removeProjectFromFavorite`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    projectId: projectInfo._id
                })
            });

            const data = await response.json();
            if (data.error) {
                console.log(data.error, 'error from removeProjectToFavorite');
            }
            if (data.message) {
                console.log(data.message, 'message from removeProjectToFavorite');
            }
            if (data.success) {
                setUserInfo({ ...userInfo, favProjectIdList: newFavProjectIdList });
                setIsStarred(!isStarred);
            }
        } else {
            const newFavProjectIdList = [...userInfo.favProjectIdList, projectInfo._id];
            // setUserInfo({ ...userInfo, favProjectIdList: newFavProjectIdList });

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/addProjectToFavorite`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    projectId: projectInfo._id
                })
            });

            const data = await response.json();
            if (data.error) {
                console.log(data.error, 'error from addProjectToFavorite');
            }
            if (data.message) {
                console.log(data.message, 'message from addProjectToFavorite');
            }
            if (data.success) {
                setUserInfo({ ...userInfo, favProjectIdList: newFavProjectIdList });
                setIsStarred(!isStarred);
            }

        }
    }



    return (
        <>
            <div className={classes.header}>
                <Container className={classes.mainSection} fluid={true} mb={'0px'}>
                    <Group position="apart">
                        <Group>
                            <IconArrowLeft size={30} onClick={backToProjects} />
                            <Group>
                                <IconBook2 size={70} />
                                <Title order={3}>
                                    {projectInfo.projectName}
                                </Title>
                                {isStarred && <IconStarFilled size={20} onClick={(e) => { handleFavoriteClick(e) }} />}
                                {!isStarred && <IconStar size={20} onClick={(e) => { handleFavoriteClick(e) }} />}
                            </Group>
                        </Group>
                        <ProfileMenu userInfo={user} />
                    </Group>
                </Container>
                <Container fluid={true}>
                    <Tabs
                        defaultValue="Home"
                        variant="outline"
                        classNames={{
                            root: classes.tabs,
                            tabsList: classes.tabsList,
                            tab: classes.tab,
                        }}
                        value={activeTab}
                        onTabChange={(tab) => { handleTabChange(tab) }}
                    >
                        <Tabs.List>{items}</Tabs.List>
                    </Tabs>
                </Container>
            </div>
        </>
    );
}

export default ProjectInfoBar_v2;