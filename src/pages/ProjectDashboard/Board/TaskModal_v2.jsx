import { useDisclosure } from '@mantine/hooks';
import { Container, createStyles, Flex, Modal, MultiSelect, NativeSelect, Paper, Select, Table, Text, TextInput, useMantineTheme, Button } from '@mantine/core';
import { IconCalendarDue, IconChecks, IconCircleLetterP, IconCircleLetterS, IconTextSize, IconUrgent, IconUser, IconUsers } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import ExtraTaskComponent from './ExtraTaskComponent';
import TaskModalForm from './TaskModalForm';




const TaskModal_v2 = ({ taskInfo, sectionInfo, show, closeModal, rerender, setRerender, projectInfo, AssigneeList, userInfo, userAccessLevel }) => {
    // const [opened, { open, close }] = useDisclosure(show);

    // console.log(AssigneeList, "AssigneeList");
    const theme = useMantineTheme();
    const dateFormater = (date) => {
        if (date) {
            let newDate = new Date(date);
            return newDate
        }
        return date;
    }

    const assigneeFormatter = (assigneeList) => {
        let assigneeListTemp = [];
        assigneeList?.forEach((assignee) => {
            assigneeListTemp.push(assignee._id);
        })
        return assigneeListTemp;
    }


    const [taskName, setTaskName] = useState(taskInfo.taskName);
    const [taskCompletion, setTaskCompletion] = useState(taskInfo.taskCompletion);
    const [taskAssigneeList, setTaskAssigneeList] = useState(assigneeFormatter(taskInfo.taskAssigneeList));
    const [taskPriority, setTaskPriority] = useState(taskInfo.taskPriority);
    const [taskStatus, setTaskStatus] = useState(taskInfo.taskStatus);
    const [taskDeadline, setTaskDeadline] = useState(dateFormater(taskInfo.taskDeadline));
    const [taskDescription, setTaskDescription] = useState(taskInfo.taskDescription);

    // console.log(taskDeadline, "taskDeadline");
    // console.log(value, "value");
    // console.log(taskAssignee, "taskAssignee");
    // console.log(taskName, taskCompletion, taskAssigneeList, taskPriority, taskStatus, taskDescription, "taskInfo");
    // console.log(taskInfo.taskDiscussion, "taskInfo.taskDiscussion")

    const saveTask = async () => {
        console.log(taskName, taskCompletion, taskAssigneeList, taskPriority, taskStatus, taskDeadline, taskDescription, "taskInfo");

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/task/updateTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({
                taskId: taskInfo._id,
                taskName,
                taskDescription,
                taskCompletion,
                taskPriority,
                taskStatus,
                taskAssigneeList,
                taskSectionId: sectionInfo._id,
                taskProjectId: projectInfo._id,
                taskCreator: userInfo._id,
                taskDeadline,
            })
        });
        const data = await response.json();
        console.log(data, "data");
        if (data.success) {
            setRerender(!rerender);
            closeModal();
        }
    }



    return (
        <>
            <Modal
                opened={show}
                onClose={closeModal}
                title={projectInfo.projectName + '/' + sectionInfo.sectionName}
                overlayProps={{
                    color: theme.colors.dark[9],
                    opacity: 0.55,
                    blur: 3,
                }}
                size="80vw"
            >
                <Container p={0} m={0} display={'flex'} fluid={true} sx={{ flexDirection: 'column' }} >
                    <Flex h={'70vh'} p={0} m={0}>
                        <Paper w={'60%'} h={'108%'} sx={{ borderRight: '2px solid #dee2e6', borderRadius: '0px' }}>
                            <ExtraTaskComponent
                                taskDescription={taskDescription}
                                setTaskDescription={setTaskDescription}
                                taskDiscussionId={taskInfo.taskDiscussion}
                            />
                        </Paper>
                        <Paper size={'sm'} mr={0} w={'40%'} p={20} pl={30} >
                            <TaskModalForm
                                taskName={taskName}
                                setTaskName={setTaskName}
                                taskCompletion={taskCompletion}
                                setTaskCompletion={setTaskCompletion}
                                taskAssigneeList={taskAssigneeList}
                                setTaskAssigneeList={setTaskAssigneeList}
                                taskPriority={taskPriority}
                                setTaskPriority={setTaskPriority}
                                taskStatus={taskStatus}
                                setTaskStatus={setTaskStatus}
                                taskDeadline={taskDeadline}
                                setTaskDeadline={setTaskDeadline}
                                AssigneeList={AssigneeList}
                            />
                        </Paper>
                    </Flex>

                    <Flex justify={'end'} gap={5}>
                        <Button size='sm' onClick={saveTask}>Save</Button>
                        <Button size='sm' onClick={closeModal}>Close</Button>
                    </Flex>
                </Container>
            </Modal>
        </>
    );
}

export default TaskModal_v2;

