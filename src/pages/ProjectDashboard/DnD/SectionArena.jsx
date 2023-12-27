import { createStyles, Text, rem, Title, Paper, Container } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import reorder, { reorderQuoteMap } from './reorder';
import Column from './Column';

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

    container: {
        display: 'inline-flex',
        minHeight: '100vh',
        minWidth: '100vw',
    }

}));


const initial = {
    'column-1': {
        id: 'column-1',
        items: {
            'item-1': { id: 'item-1', content: 'Item 1' },
            'item-2': { id: 'item-2', content: 'Item 2' },
        }
    },
    'column-2': {
        id: 'column-2',
        items: {
            'item-3': { id: 'item-3', content: 'Item 3' },
            'item-4': { id: 'item-4', content: 'Item 4' },
        }
    },
    'column-3': {
        id: 'column-3',
        items: {
            'item-5': { id: 'item-5', content: 'Item 5' },
            'item-6': { id: 'item-6', content: 'Item 6' },
        }
    },
}

const SectionArena_v2 = ({ data }) => {

    const classes = useStyles();

    const [columns, setColumns] = useState(initial);

    const [ordered, setOrdered] = useState(Object.keys(initial));

    const onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === "COLUMN") {
                const shallow = [...ordered];
                shallow.splice(result.source.index, 1);
                setOrdered(shallow);
                return;
            }

            const column = columns[result.source.droppableId];
            const withQuoteRemoved = [...column];

            withQuoteRemoved.splice(result.source.index, 1);

            const orderedColumns = {
                ...columns,
                [result.source.droppableId]: withQuoteRemoved
            };
            setColumns(orderedColumns);
            return;
        }

        // dropped nowhere
        if (!result.destination) {
            return;
        }

        const source = result.source;
        const destination = result.destination;

        // did not move anywhere - can bail early
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // reordering column
        if (result.type === "COLUMN") {
            const reorderedorder = reorder(ordered, source.index, destination.index);

            setOrdered(reorderedorder);

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination
        });

        setColumns(data.quoteMap);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                    isCombineEnabled={false}
                >
                    {(provided) => (
                        <Paper ref={provided.innerRef} {...provided.droppableProps} sx={classes.Container}>
                            {ordered.map((key, index) => (
                                <Column
                                    key={key}
                                    index={index}
                                // title={key}
                                // quotes={columns[key]}
                                // isScrollable={withScrollableColumns}
                                // isCombineEnabled={isCombineEnabled}
                                // useClone={useClone}
                                />
                            ))}
                            {provided.placeholder}
                        </Paper>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};




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


export default SectionArena_v2;