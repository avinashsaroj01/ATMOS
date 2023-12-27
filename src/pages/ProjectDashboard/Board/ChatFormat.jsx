import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
    Menu,
    ActionIcon,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import zIndex from '@mui/material/styles/zIndex';
import { IconDots, IconTrash } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.sm} ${theme.spacing.sm}`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }

    },

    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },

    dropdownMenu: {
        // backgroundColor: '#fdfeff',
        border: '1px solid #e1e1e1',
        // zIndex: 100,

        '&:hover': {
            // backgroundColor: 'white',
        }
    },


}));


const ChatFormat = ({ postedAt, body, author, discussionThreadId, taskDiscussionId, setDiscussionThread }) => {

    const { classes } = useStyles();
    const { hovered, ref } = useHover();

    // console.log(postedAt, body, author, 'chat format');

    const convertToPostedAgoFormat = (date) => {
        const postedAt = new Date(date);
        const now = new Date();
        const diff = now - postedAt;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);

        if (minutes < 1) {
            return 'Just now';
        }

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours} hours ago`;
        }

        const days = Math.floor(hours / 24);

        if (days < 7) {
            return `${days} days ago`;
        }

        const weeks = Math.floor(days / 7);

        if (weeks < 4) {
            return `${weeks} weeks ago`;
        }

        const months = Math.floor(weeks / 4);

        if (months < 12) {
            return `${months} months ago`;
        }

        const years = Math.floor(months / 12);

        return `${years} years ago`;
    }

    const deleteDiscussionThread = async () => {
        console.log('delete comment');
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/deleteDiscussionThread/${taskDiscussionId}/${discussionThreadId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
            setDiscussionThread(data.discussion.discussionThread);
            console.log('Discussison Thread deleted successfully');
        }
    }


    return (
        <>
            <Paper withBorder radius="md" className={classes.comment} m={5} ref={ref}>
                <Group position='apart'>
                    <Group >
                        <Avatar src={author.avatar} alt={author.name} radius="xl" />
                        <div>
                            <Text fz="sm">{author.name}</Text>
                            <Text fz="xs" c="dimmed">
                                {convertToPostedAgoFormat(postedAt)}
                            </Text>
                        </div>
                    </Group>
                    {hovered &&
                        <Menu
                            transitionProps={{ transition: 'pop' }}
                            withArrow
                            position="bottom-end"
                            menuPosition="right"
                            zIndex={100}
                            sx={classes.dropdownMenu}
                            withBorder
                        // onClick={(e) => e.stopPropagation()}
                        >
                            <Menu.Target >
                                <ActionIcon
                                    zIndex={100}
                                    onClick={(e) => e.stopPropagation()}

                                >
                                    <IconDots size="1rem" stroke={1.5} />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown
                                onClick={(e) => e.stopPropagation()}
                                zIndex={100}
                            >
                                <Menu.Item icon={<IconTrash size="1rem" stroke={1.5} />} color="red" onClick={event => { deleteDiscussionThread(discussionThreadId) }}>
                                    Delete Thread
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    }

                </Group>
                <TypographyStylesProvider className={classes.body}>
                    <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
                </TypographyStylesProvider>
            </Paper>
        </>
    );
}

export default ChatFormat;