import { ActionIcon, Badge, Card, createStyles, Group, Menu, Paper, Text, } from "@mantine/core";
import { IconDots, IconMessages, IconNote, IconReportAnalytics, IconTrash } from "@tabler/icons-react";
import { styles } from "./TaskCard.module.css";
import { useHover } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const useStyles = createStyles((theme) => ({
    taskBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // height: '100%',
        width: '100%',
        padding: theme.spacing.md,
        boxSizing: 'border-box',
        cursor: 'pointer',
        transition: 'box-shadow 150ms ease, transform 100ms ease',
        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.03)',
        },
        maxWidth: 325,
        maxHeight: 200,
        margin: '0 0 20px 0',
    },
    taskName: {
        maxWidth: '75%',
        minWidth: '75%',
    },
    taskBadge: {
        color: 'white',
        paddingTop: '2px',
        paddingBottom: '2px',
    },

}));

const TaskCard = ({ task, section, expandModal, rerender, setRerender, userAccessLevel }) => {

    const { classes } = useStyles();
    const { hovered, ref } = useHover();

    console.log(task, 'task');
    const dateFormater = (date) => {
        let newDate = new Date(date);
        const offset = newDate.getTimezoneOffset()
        newDate = new Date(newDate.getTime() - (offset * 60 * 1000))
        return newDate.toISOString().split('T')[0]
    }

    const deleteTask = async (event, taskID) => {
        event.stopPropagation();

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/deleteTask/${taskID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("deleted task", taskID);
        setRerender(!rerender);

    }

    const colorPickerPriority = (priority) => {
        switch (priority) {
            case 'High':
                return 'orange';
            case 'Medium':
                return 'yellow';
            case 'Low':
                return 'lime';
            default:
                return 'gray';
        }
    }

    const colorPickerStatus = (status) => {
        switch (status) {
            case "In Progress":
                return 'teal';
            case 'Stuck':
                return 'pink';
            case 'Backlog':
                return 'red';
            default:
                return 'gray';
        }
    }

    const openTaskModal = (e) => {
        e.stopPropagation();
        expandModal(task, section);
    }


    return (
        <>
            <Paper withBorder radius="md" sx={classes.taskBody} ref={ref} onClick={(e) => openTaskModal(e)} >
                <Group position="apart" mb={5} h={'30px'} >
                    <Text
                        truncate
                        sx={classes.taskName}
                    >{task.taskName}</Text>
                    {(userAccessLevel === 'owner' || userAccessLevel === 'high' || userAccessLevel === 'medium') && hovered &&
                        <Menu
                            transitionProps={{ transition: 'pop' }}
                            offset={2}
                            arrowPosition="center"
                            withArrow
                            position="bottom"
                            menuPosition="right"
                            zIndex={100}
                            trigger="click"

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
                                <Menu.Item
                                    icon={<IconTrash size="1rem" stroke={1.5} z={5} />}
                                    color="red"
                                    onClick={event => { deleteTask(event, task._id) }}
                                >
                                    Delete Task
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    }
                </Group>
                {
                    ((task.taskPriority !== "Choose Priority") || (task.taskStatus !== "Choose Status")) &&
                    <Group>
                        {task.taskPriority && (task.taskPriority !== "Choose Priority") && <Badge color={colorPickerPriority(task.taskPriority)} radius="md" variant="light">{task.taskPriority}</Badge>}
                        {task.taskStatus && (task.taskStatus !== "Choose Status") && <Badge color={colorPickerStatus(task.taskStatus)} radius="md" variant="light">{task.taskStatus}</Badge>}
                    </Group>
                }
                {task.taskDeadline && dateFormater(task.taskDeadline) != '1970-01-01' &&
                    <Group position="apart" mt={5}>
                        <Text ta="left" fz="sm" c="dimmed">
                            {dateFormater(task.taskDeadline)}
                        </Text>
                    </Group>
                }



            </Paper>

            {/* <div className="task task-0"
                variant="primary"
                onClick={() => expandModal(task, section)}
                key={task.id}>
                <div className="task-head">
                    <input type="checkbox" className="task-checker-input" checked={task.taskCompletion} readOnly />
                    <input type="text" className="task-name-input" placeholder="Task Name" value={task.taskName ? task.taskName : ""} readOnly />
                </div>
                <div className="task-info">
                    {task.taskPriority && (task.taskPriority !== "Choose Priority") && <p className="priority-tag">{task.taskPriority}</p>}
                    {task.taskStatus && (task.taskStatus !== "Choose Status") && <p className="status-tag">{task.taskStatus}</p>}
                </div>
                <div className="task-timeline">
                    <div className="deadine">
                        {task.taskDeadline && dateFormater(task.taskDeadline) != '1970-01-01' && <p className="date">{dateFormater(task.taskDeadline)}</p>}
                    </div>
                    <div className="delete-btn-div" onClick={event => { deleteTask(event, task._id) }}>
                        <img src="https://img.icons8.com/external-inkubators-glyph-inkubators/25/000000/external-delete-ecommerce-user-interface-inkubators-glyph-inkubators.png" />
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default TaskCard;