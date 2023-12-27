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
    // rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconLogout,
    IconHeart,
    IconStar,
    IconMessage,
    IconSettings,
    IconPlayerPause,
    IconTrash,
    IconSwitchHorizontal,
    IconChevronDown,
    Icon123,
    IconBook2,
    IconArrowLeft,
    IconStarFilled
} from '@tabler/icons-react';


const useStyles = createStyles((theme) => ({
    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
}));



const ProfileMenu = ({ userInfo }) => {
    const { classes, theme } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [user, setUser] = useState(userInfo);

    // console.log('User from admin', userInfo);


    return (<>
        <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
        >
            <Menu.Target>
                <UnstyledButton
                    className={classes.user}
                >
                    <Group spacing={7}>
                        <Avatar src={userInfo.avatar} alt={userInfo.userName} radius="xl" size={24} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
                    <Link to="/admin-portal">Admin Portal</Link>
                </Menu.Item>
                <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}><Link to="/admin-portal/logout">Log Out</Link></Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                    Delete account
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    </>);
}

export default ProfileMenu;