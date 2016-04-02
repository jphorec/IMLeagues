import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';

let cardsList = [
    {
        id: 1,
        title: "Read a book",
        description: "I should read the whole book",
        color: "#BD8D31",
        status: "in-progress",
        tasks: [
            {
                id: 0,
                name: "maybe some philosophy",
                done: false
            }
        ]
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book",
        color: "#3A7E28",
        status: "todo",
        tasks: [
            {
                id: 0,
                name: "Learn React",
                done: true
            },
            {
                id: 1,
                name: "ContactList Example",
                done: false
            },
            {
                id:2,
                name: "Kanban Board",
                done: false
            }
        ]
    }
]

React.render(<KanbanBoard cards={cardsList} />, document.getElementById("root"));
