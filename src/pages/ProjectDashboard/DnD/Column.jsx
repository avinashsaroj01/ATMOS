import { Container, Header, Title } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";

const Column = (props) => {
    const title = props.title;
    const quotes = props.quotes;
    const index = props.index;
    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}>
                    <Header isDragging={snapshot.isDragging}>
                        <Title
                            isDragging={snapshot.isDragging}
                            {...provided.dragHandleProps}
                            aria-label={`${title} quote list`}
                        >
                            {title}
                        </Title>
                    </Header>
                    {/* <QuoteList
                        listId={title}
                        listType="QUOTE"
                        style={{
                            backgroundColor: snapshot.isDragging ? colors.G50 : null
                        }}
                        quotes={quotes}
                        internalScroll={props.isScrollable}
                        isCombineEnabled={Boolean(props.isCombineEnabled)}
                        useClone={Boolean(props.useClone)}
                    /> */}
                </Container>
            )}
        </Draggable>
    );
}

export default Column;