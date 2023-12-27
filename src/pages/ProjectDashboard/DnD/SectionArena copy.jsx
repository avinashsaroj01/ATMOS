import { createStyles, Text, rem, Title, Paper } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => ({
    item: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.radius.md,
        border: `${(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
        padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        marginBottom: theme.spacing.sm,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },

    symbol: {
        fontSize: (30),
        fontWeight: 700,
        width: (60),
    },
}));


const SectionArena_v3 = ({ data }) => {
    const { classes, cx } = useStyles();

    const [state, handlers] = useListState([
        {
            "taskId": 'csjs1',
            "TaskName": 'Task 1',
        },
        {
            "taskId": 'csjs2',
            "TaskName": 'Task 2',
        },
        {
            "taskId": 'csjs3',
            "TaskName": 'Task 3',
        }
    ]);

    const [state2, handlers2] = useListState([
        {
            "taskId": 'csjs4',
            "TaskName": 'Task 4',
        },
        {
            "taskId": 'csjs5',
            "TaskName": 'Task 5',
        },
    ]);

    const [state3, handlers3] = useListState([
        {
            "taskId": 'csjs6',
            "TaskName": 'Task 6',
        },
        {
            "taskId": 'csjs7',
            "TaskName": 'Task 7',
        },
        {
            "taskId": 'csjs8',
            "TaskName": 'Task 8',
        }
    ]);



    const [taskList, setTaskList] = useState([
        {
            id: "column-0",
            title: "First column",
            items: state
        },
        {
            id: "column-1",
            title: "Second column",
            items: state2
        },
        {
            id: "column-2",
            title: "Third column",
            items: state3
        },

    ]);



    const onDragEndFunc = (result) => {

        // console.log(result);

        const { destination, source, draggableId, type } = result;
        console.log(destination, source, draggableId, type);

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'COLUMN') {
            const newColumnOrder = Array.from(taskList);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, taskList[source.index]);
            setTaskList(newColumnOrder);
            return;
        }

        // if (type === 'CARD') {
        //     console.log('CARD');
        // }

        // const start = taskList[source.droppableId];
        // const finish = taskList[destination.droppableId];

        const start = taskList.filter((column) => column.id === source.droppableId)[0];
        const finish = taskList.filter((column) => column.id === destination.droppableId)[0];

        console.log(start, finish, 'start, finish');

        if (start === finish) {
            const newItems = Array.from(start.items);
            newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, start.items[source.index]);
            const newColumn = {
                ...start,
                items: newItems,
            };

            console.log(newColumn, 'newColumn');

            const newState = [...taskList];
            newState[source.droppableId] = newColumn;
            setTaskList(newState);
            return;
        }


        // Moving from one list to another
        const startItems = Array.from(start.items);
        startItems.splice(source.index, 1);
        const newStart = {
            ...start,
            items: startItems,
        };

        const finishItems = Array.from(finish.items);
        finishItems.splice(destination.index, 0, start.items[source.index]);
        const newFinish = {
            ...finish,
            items: finishItems,
        };

        const newState = [...taskList];
        newState[source.droppableId] = newStart;
        newState[destination.droppableId] = newFinish;

        console.log(newStart, 'newState->cross list');
        console.log(newFinish, 'newState->cross list');

        setTaskList(newState);

    }

    console.log(taskList);



    return (
        <DragDropContext
            onDragEnd={(result) => { onDragEndFunc(result) }}
        >
            <Droppable droppableId="section-arena" type="COLUMN" direction='horizontal'>
                {(provided, snapshot) => (
                    <div
                        className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <div className='section-arena-container'>
                            <div className='section-arena'>
                                {taskList.map((column, index) => {
                                    return (
                                        <Draggable draggableId={column.id} index={index} key={column.id}>
                                            {(provided, snapshot) => (
                                                <div
                                                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <div className='section-arena-column'>
                                                        <Droppable droppableId={column.id} key={column.id} index={index} type='CARD' >
                                                            {(provided) => (
                                                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                                                    <Paper p={10} m={10}>
                                                                        <Title order={6} style={{ marginRight: 10 }}>
                                                                            {column.title}
                                                                        </Title>
                                                                        {column.items.map((item, index) => {
                                                                            return (
                                                                                <Draggable draggableId={item.taskId} index={index}>
                                                                                    {(provided, snapshot) => (
                                                                                        <div
                                                                                            className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                                                                                            {...provided.draggableProps}
                                                                                            {...provided.dragHandleProps}
                                                                                            ref={provided.innerRef}
                                                                                        >
                                                                                            <div className='section-arena-column-item'>
                                                                                                <Paper p={10} m={10}>
                                                                                                    <Title order={6} style={{ marginRight: 10 }}>
                                                                                                        {item.TaskName}
                                                                                                    </Title>
                                                                                                </Paper>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            )
                                                                        })}
                                                                        {provided.placeholder}
                                                                    </Paper>
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}





{/* <div className='section-arena-container'>
                <div className='section-arena'>
                    //make the section draggable too

                    {taskList.map((column, index) => {
                        return (
                            <Draggable draggableId="section-arena" index={0}>
                                {(provided, snapshot) => (
                                    <div
                                        className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                    >
                                        <div className='section-arena-column'>
                                            <Droppable droppableId={column.id} key={column.id} index={index}>
                                                {(provided) => (
                                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                                        <Paper p={10} m={10}>
                                                            <Title order={6} style={{ marginRight: 10 }}>
                                                                {column.title}
                                                            </Title>
                                                            {
                                                                column.items.map((item, index) => {
                                                                    return (
                                                                        <Draggable key={item.taskId} index={index} draggableId={item.taskId}>
                                                                            {(provided, snapshot) => (
                                                                                <div

                                                                                    className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    ref={provided.innerRef}
                                                                                >
                                                                                    <div className={classes.symbol}>{item.TaskName}</div>

                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    )
                                                                })
                                                            }
                                                            {provided.placeholder}
                                                        </Paper>
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        )
                    })}
                </div>
            </div> */}
//         </ DragDropContext >
//     );
// }


export default SectionArena_v3;