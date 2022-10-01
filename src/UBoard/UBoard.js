import React, { useState } from 'react'
import './UBoard.css'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'

const initialData = {
    tasks: {
        1: { id: 1, content: "we say goodbye to our beloved pet, Nibbler." },
        2: { id: 2, content: "It's okay, Bender. I like cooking too." },
        3: { id: 3, content: "The alien mothership is in orbit here." },
        4: { id: 4, content: "Zoidberg, that doesn't make sense. But, okay!" },
        5: { id: 5, content: "I was having the most wonderful dream." },
        6: { id: 6, content: " I respect Harold Zoid too much to beat him." }
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To Do",
            taskIds: [1, 2, 3]
        },
        "column-2": {
            id: "column-2",
            title: "In Progress",
            taskIds: [4, 5]
        },
        "column-3": {
            id: "column-3",
            title: "Done",
            taskIds: [6]
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
}

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
        ...sourceCol,
        taskIds: newTaskIds,
    };

    return newColumn;
};



function UBoard() {
    const [state, setState] = useState(initialData);

    const handleDragEnd = (result) => {
        const { destination, source } = result;

        // If user tries to drop in an unknown destination
        if (!destination) return;

        // if the user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // If the user drops within the same column but in a different positoin
        const sourceCol = state.columns[source.droppableId];
        const destinationCol = state.columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const newColumn = reorderColumnList(sourceCol, source.index, destination.index);

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setState(newState);
            return;
        }

        // If the user moves from one column to another
        const startTaskIds = Array.from(sourceCol.taskIds);
        const [removed] = startTaskIds.splice(source.index, 1);
        const newStartCol = {
            ...sourceCol,
            taskIds: startTaskIds,
        };

        const endTaskIds = Array.from(destinationCol.taskIds);
        endTaskIds.splice(destination.index, 0, removed);
        const newEndCol = {
            ...destinationCol,
            taskIds: endTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol,
            },
        };

        setState(newState);
    };

    return (
        <section id='uboard'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <article className='uboard-board'>
                    {state.columnOrder.map((columnId) => {
                        const column = state.columns[columnId]
                        const tasks = column.taskIds.map((taskId) => state.tasks[taskId])
                        return <Column key={column.id} column={column} tasks={tasks} />
                    })}
                </article>
            </DragDropContext>
        </section>
    )
}

export default UBoard