import React from 'react';
import styles from './TeamMemberCard.module.css';
import {
    UnstyledButton,
    Tooltip,
    Modal,
    UnstyledButtonProps,
    Group,
    Avatar,
    Select,
    Text,
    Divider,
    createStyles,
    Container,
    Flex
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { Button } from 'react-bootstrap';
import { openConfirmModal } from '@mantine/modals';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: theme.spacing.md,

        // border: '1px solid rgba(206, 201, 201, 0.7)',
        // borderRadius: '5px',
        // margin: '5px 0 5px 0',

        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
    },

    membercard: {
        minWidth: '100%',
        padding: '0px',
        maxWidth: '100%',
    }

}));

const roleList = [
    { label: 'High', value: 'highAccess' },
    { label: 'Medium', value: 'mediumAccess' },
    { label: 'Low', value: 'lowAccess' }
];


const TeamMemberCard = ({ name, email, role, id, projectOwnerId, projectId, userAccessLevel, avatar, rightSectionIcon = false, rerender, setRerender }) => {
    const { classes } = useStyles();
    const [opened, setOpened] = React.useState(false);
    const [memberRole, setmemberRole] = React.useState(role);

    const handleRoleChange = (value) => {
        setmemberRole(value);
    }

    const openAccessChangeModal = () =>
        openConfirmModal({
            title: 'Change Member Access',
            children: (
                <div >
                    <Text size="lg" weight={400}>
                        Are you sure you want to change the access level of this member?
                    </Text>
                    <Text color="dimmed" size="sm">
                        This will change the access level of <span className='text-primary fw-bolder'>{name}</span> to <span className='text-primary fw-bold'>{memberRole === 'highAccess' ? 'High' : memberRole === 'mediumAccess' ? 'Medium' : 'Low'}</span>
                    </Text>
                </div>
            ),
            labels: { confirm: 'Change Access', cancel: 'Cancel' },
            onConfirm: handleAccessChange,
            onCancel: () => console.log('Access Change Cancelled'),
        });


    const handleAccessChange = async () => {
        try {
            console.log('Access Changed Data: ', id, memberRole);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}/changeUserAccessLevel`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    userId: id,
                    newAccessLevel: memberRole
                })
            });
            const data = await res.json();
            console.log(data);
            if (!data.success) {
                console.log('Access Changed');
                console.log(data.error);
                alert(data.message);
            }
            else {
                setOpened(false);
                setRerender(!rerender);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const openRemoveMemberModal = () =>
        openConfirmModal({
            title: 'Remove Member',
            children: (
                <div className=''>
                    <Text size="lg" weight={400}>
                        Are you sure you want to remove this member?
                    </Text>
                    <Text color="dimmed" size="sm">
                        This will remove <span className='text-danger fw-bold'>{name}</span> from the team
                    </Text>
                </div>
            ),
            labels: { confirm: 'Remove Member', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: handleRemoveMember,
            onCancel: () => console.log('Member Removal Cancelled'),
        });

    const handleRemoveMember = async () => {
        try {
            console.log('Member Removed Data: ', id);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/project/${projectId}/removeTeamMember`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    userId: id
                })
            });
            const data = await res.json();
            console.log(data);
            if (!data.success) {
                console.log(data.error);
                alert(data.message);
            }
            else {
                console.log('Member Removed');
                setOpened(false);
                setRerender(!rerender);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} size="md" title="Edit Member">
                <Container size="sm">
                    <Divider label="Member Details" className='mb-3' size="md" labelPosition='center' />
                    <Group position="center" spacing="xl">
                        <Avatar src={avatar} radius="xl" size={90} className="me-4" />
                        <Divider orientation='vertical' />
                        <div className='text-center mt-2 ms-4'>
                            <Text size="xl" weight={500}>
                                {name}
                            </Text>
                            <Text color="dimmed" size="sm">
                                {email}
                            </Text>
                        </div>
                    </Group>
                    <Divider className='mt-3' label="Member Role & Access" size="md" labelPosition='center' />
                    <div className='text-center mt-2 ms-4'>
                        <Select value={memberRole} label="Choose a role for the team member"
                            placeholder="Pick a Role"
                            disabled={(userAccessLevel === 'owner' || userAccessLevel === 'high') && projectOwnerId !== id ? false : true}
                            onChange={handleRoleChange} data={roleList} />
                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" className='mt-3' onClick={openAccessChangeModal} disabled={(userAccessLevel === 'owner' || userAccessLevel === 'high') && projectOwnerId !== id ? false : true}>Change</Button>
                            <Button variant="danger" className='mt-3 ms-3' onClick={openRemoveMemberModal} disabled={(userAccessLevel === 'owner' || userAccessLevel === 'high') && projectOwnerId !== id ? false : true}
                            >Remove Member</Button>
                        </div>

                    </div>
                    {/* <Divider className='mt-3' label="Member Access" size="md" labelPosition='center' />
                <div className='text-center mt-2 ms-4'>
                    <Text size="sm" weight={500}>
                        {memberRole}
                    </Text>
                    <Text color="dimmed" size="xs">
                        {memberRole === 'highAccess' ? 'Can view and edit all the project details' : memberRole === 'mediumAccess' ? 'Can view and edit all the project details except the project settings' : 'Can view all the project details'}
                    </Text>
                </div> */}
                    <Divider className='mt-3' size="md" />
                </Container>
            </Modal>


            <Tooltip label="Edit Member" position="right" withArrow>
                <UnstyledButton className={classes.user} onClick={() => setOpened(true)} >
                    <Flex align={'center'} justify={'center'} sx={classes.membercard}>

                        <div style={{ display: 'flex' }}>
                            <Avatar src={avatar} radius="xl" />
                        </div>

                        <div style={{ flex: 1, paddingLeft: '10px' }}>
                            <Text size="sm" weight={500}>
                                {name}
                            </Text>

                            <Text color="dimmed" size="xs">
                                {email}
                            </Text>
                        </div>

                        {rightSectionIcon && (<div style={{ display: 'flex' }}>
                            {<IconChevronRight size={14} stroke={1.5} />}
                        </div>)}

                    </Flex>
                </UnstyledButton >
            </Tooltip>
        </>
    );
}

export default TeamMemberCard;