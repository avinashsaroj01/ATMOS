import { Container, createStyles, Flex, Modal, MultiSelect, NativeSelect, Paper, Select, Table, Text, TextInput, useMantineTheme } from '@mantine/core';
import { IconCalendarDue, IconChecks, IconCircleLetterP, IconCircleLetterS, IconTextSize, IconUrgent, IconUser, IconUsers } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';

const useStyles = createStyles((theme) => ({
    tableRow: {
        border: 'none' + ' ' + '!important',
        // display: 'flex',
        // alignItems: 'center',
    }
}));

const TaskModalForm = ({
    taskName,
    setTaskName,
    taskCompletion,
    setTaskCompletion,
    taskAssigneeList,
    setTaskAssigneeList,
    taskPriority,
    setTaskPriority,
    taskStatus,
    setTaskStatus,
    taskDeadline,
    setTaskDeadline,
    AssigneeList
}) => {

    const { classes } = useStyles();

    // console.log(taskDeadline, "taskDeadline");

    // const checkDate = (date) => {
    //     if (date === 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)') {
    //         const newdate = new Date();
    //         console.log(newdate, "newdate");
    //         return newdate;
    //     }
    //     else {
    //         return date;
    //     }
    // }


    return (
        <>
            <Table>
                <tbody className={classes.tableRow}>
                    <tr className={classes.tableRow}>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <IconTextSize />
                            <Text size={'sm'} ml={5}>Task Name</Text>
                        </td>
                        <td >
                            <TextInput
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder='Enter task name'
                            />
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <IconChecks />
                            <Text size={'lg'} ml={5}>Completed</Text>
                        </td>
                        <td>
                            <Select
                                placeholder="Task Completed"
                                value={taskCompletion}
                                onChange={setTaskCompletion}
                                data={[
                                    { value: true, label: 'Yes' },
                                    { value: false, label: 'No' },
                                ]}
                            />
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <IconUsers />
                            <Text size={'lg'} ml={5}>Assignee</Text>
                        </td>
                        <td>
                            <MultiSelect
                                miw={'350px'}
                                maw={'350px'}
                                placeholder='Select assignee'
                                value={taskAssigneeList}
                                onChange={setTaskAssigneeList}
                                data={AssigneeList}
                                searchable
                                nothingFound="Nothing found"
                                maxDropdownHeight={160}
                                size={'sm'}
                            />
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <IconCircleLetterP />
                            <Text size={'lg'} ml={5}>Priority</Text>
                        </td>
                        <td>
                            <Select
                                placeholder="Select Priority"
                                value={taskPriority}
                                onChange={setTaskPriority}
                                data={[
                                    { value: 'High', label: 'High' },
                                    { value: 'Medium', label: 'Medium' },
                                    { value: 'Low', label: 'Low' },
                                ]}
                            />
                        </td>
                    </tr>
                    <tr >
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <IconCircleLetterS />
                            <Text size={'lg'} ml={5}>Status</Text>
                        </td>
                        <td>
                            <Select
                                placeholder="Select Status"
                                value={taskStatus}
                                onChange={setTaskStatus}
                                data={[
                                    { value: 'In Progress', label: 'In Progress' },
                                    { value: 'Stuck', label: 'Stuck' },
                                    { value: 'Backlog', label: 'Backlog' },
                                    { value: 'Done', label: 'Done' },
                                ]}
                            />
                        </td>
                    </tr>
                    <tr className={classes.tableRow}>
                        <td style={{ display: 'flex', alignItems: 'center' }}>
                            <IconCalendarDue />
                            <Text size={'lg'} ml={5}>Deadline</Text>
                        </td>
                        <td>
                            <DatePickerInput
                                placeholder='Select date'
                                // value={taskDeadline}
                                // onChange={(e) => setTaskDeadline(dateFormater(e.target.value))}
                                value={taskDeadline}
                                onChange={setTaskDeadline}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default TaskModalForm;