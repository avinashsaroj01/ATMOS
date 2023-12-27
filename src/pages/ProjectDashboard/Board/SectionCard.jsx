import { useState } from "react";
import TaskCard from "./TaskCard";
import React from "react"
import { ActionIcon, Button, Card, Container, createStyles, Group, Input, Menu } from "@mantine/core";
import { IconDots, IconMessages, IconNote, IconReportAnalytics, IconTrash } from "@tabler/icons-react";
import { useHover, useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect } from "react";



const useStyles = createStyles((theme) => ({
    card: {
        minWidth: 325,
        maxWidth: 325,
        height: 'fit-content',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.md,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'box-shadow 100ms ease-out',
        xOverflow: 'auto',

        //remove srcollbar
        '&::-webkit-scrollbar': {
            display: 'none',
        },

        '&:hover': {
            // boxShadow: theme.shadows.sm,
        },
    },
    cardTopContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    sectionTitleInput: {
        // fontSize: 15,
        fontWeight: 500,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        outline: 'none',
        border: '1px solid transparent',
        '&:focus': {
            // outline: 'none',
            // border: '1px solid #ffffff',
        },
        '&:focus-within': {
            outline: 'none',
            border: '1px solid #228be6',
        },
        backgroundColor: '#ebeff3 !important',
    }



}));


const SectionCard = ({ projectInfo, section: sectionInfo, taskList, createTask, expandModal, rerender, setRerender, sectionIndex, userAccessLevel, handleProvided }) => {

    // console.log(sectionInfo, 'sectionInfo');
    console.log(taskList, 'taskList');

    const { classes } = useStyles();
    const { hovered, ref } = useHover();
    let count = 0;

    const taskOrder = [];
    const [state, handlers] = useListState([]);
    useEffect(() => {
        // console.log(taskList, 'taskList from sectionCard');
        for (let i = 0; i < taskList.length; i++) {
            taskOrder.push(i);
        }
        handlers.setState(taskOrder);
    }, [rerender]);

    // console.log(state, 'state from section Card');


    const [sectionName, setSectionName] = useState(sectionInfo.sectionName);
    const [isSectionOptionClicked, setIsSectionOptionClicked] = useState(false);

    const saveSectionName = async (event) => {
        const sectionID = sectionInfo._id;
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/section/renameSection/${sectionID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: JSON.stringify({ sectionName: event.nativeEvent.target.value })
        })
        const data = await response.json();
        console.log(data, 'Section Name Updated');
        setSectionName(event.nativeEvent.target.value);
        setRerender(!rerender);
    }
    const handleSectionOptionClicked = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(true);
    }

    const deleteSection = async (event) => {
        event.stopPropagation();

        const sectionID = sectionInfo._id;
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/section/deleteSection/${sectionID}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        const data = await response.json();
        console.log(data, 'Section Deleted');
        setRerender(!rerender);
        setIsSectionOptionClicked(false);
    }

    const handleClickOutside = (event) => {
        event.stopPropagation();
        setIsSectionOptionClicked(false);
    }

    const items = sectionInfo.taskIdList.length > 0 && state.length > 0 && state.map((taskIndex, index) => (
        <Draggable key={taskIndex} index={sectionIndex} draggableId={'' + taskIndex}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    key={index}
                >
                    {console.log(state, 'state')}
                    {console.log(taskIndex, sectionIndex, 'taskIndex', 'sectionIndex')}
                    {console.log(sectionInfo.sectionName, 'sectionInfo.SectionName')}
                    {console.log(sectionInfo.taskIdList, 'sectionTaskIDList')}
                    <TaskCard
                        task={taskList[taskIndex]}
                        section={sectionInfo}
                        expandModal={expandModal}
                        rerender={rerender}
                        setRerender={setRerender}
                        userAccessLevel={userAccessLevel}
                    />
                </div>
            )}
        </Draggable>
    ));

    return (
        <>
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    handlers.reorder({ from: source.index, to: destination?.index || 0 })
                }
            >


                <Card mr={'20px'} sx={classes.card} ref={ref} bg={'#ebeff3'}>
                    <div>
                        <Group sx={classes.cardTopContainer} m={0} p={0} pr={5} position='apart'  >
                            <Input placeholder="Section Name"
                                mr={'sm'}
                                sx={{
                                    Input: classes.sectionTitleInput,
                                }}
                                style={{
                                    width: '80%'
                                }}
                                value={sectionName}
                                onChange={e => { setSectionName(e.target.value) }}
                                onBlur={saveSectionName}
                            />
                            {
                                (userAccessLevel === 'owner' || userAccessLevel === 'high') && hovered && (
                                    <Menu
                                        transitionProps={{ transition: 'pop' }}
                                        offset={2}
                                        arrowPosition="center"
                                        withArrow
                                        position="bottom"
                                        menuPosition="right"
                                        zIndex={100}
                                    >
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots size="1rem" stroke={1.5} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown
                                            zindex={100}
                                        >
                                            <Menu.Item
                                                icon={<IconTrash size="1rem" stroke={1.5} />}
                                                color="red"
                                                onClick={(e) => deleteSection(e)}
                                                zindex={100}
                                            >
                                                Delete Section
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                )
                            }

                        </Group>
                    </div>

                    <Container m={0} p={0} mt={'20px'} pb={20} >
                        <Droppable
                            droppableId={sectionInfo._id}
                        // mode="virtual"
                        // renderClone={(provided, snapshot, rubric) => {
                        //     const { source } = rubric;
                        //     console.log(source, 'source');
                        //     const task = taskList[source.index];
                        //     console.log(task, 'task');
                        //     return (
                        //         <TaskCard
                        //             key={task._id}
                        //             task={task}
                        //             section={sectionInfo}
                        //             expandModal={expandModal}
                        //             rerender={rerender}
                        //             setRerender={setRerender}
                        //         />
                        //     );
                        // }
                        // }

                        >
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {items}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {
                            (userAccessLevel === 'owner' || userAccessLevel === 'high' || userAccessLevel === 'medium') && (
                                <Button fullWidth onClick={() => createTask(sectionInfo)} >
                                    Add Task
                                </Button>
                            )
                        }

                    </Container>


                </Card>
            </DragDropContext>


            {/* <div className={isSectionOptionClicked ? "show-section-option" : "hide-section-option"} onClick={handleClickOutside}></div>
            <div className="section section-0">
            <div className="section-head">
            <input
                        className="section-name"
                        placeholder="Section Name"
                        value={sectionName}
                        onChange={e => { setSectionName(e.target.value) }}
                        onBlur={saveSectionName}
                    ></input>
                    <img
                        className="add-task"
                        onClick={() => { createTask(sectionInfo) }}
                        src="https://img.icons8.com/sf-regular/48/000000/add.png"
                    />
                    <div className="section-options-div" >
                        <img
                            onClick={handleSectionOptionClicked}
                            className="section-options-img"
                            src="https://img.icons8.com/material-outlined/24/000000/more.png"
                        />
                        <div className={isSectionOptionClicked ? "section-dropdown-option-div" : "hide-section-option"} >
                            <p className="section-dropdown-menu-option" onClick={(e) => deleteSection(e)}>Delete Section</p>
                            <p className="section-dropdown-menu-option">Add Section To Left</p>
                            <p className="section-dropdown-menu-option">Add Section To Right</p>
                        </div>
                    </div>
                </div>
                <div className="task-arena">
                    {taskList && taskList.map((task) => (
                        <TaskCard
                            index={task._id}
                            task={task}
                            section={sectionInfo}
                            projectId={projectInfo.projectId}
                            expandModal={expandModal}
                            rerender={rerender}
                            setRerender={setRerender}
                            key={task._id} />
                    ))}
                    <div className='add-task-div' onClick={() => { createTask(sectionInfo) }} ><img className="add-task-img-2" src="https://img.icons8.com/sf-regular/48/000000/add.png" /><p className="paraChanges">Add Task</p></div>
                </div>
            </div> */}
        </>


    );
}

export default SectionCard;