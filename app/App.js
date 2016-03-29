import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';

let cardsList = [
    {
        id: 1,
        title: "Read a book",
        description: "I should read the whole book",
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: false
            },
            {
                id:1,
                name: "Kanban Board",
                done: false
            }
        ]
    }
]

React.render(<KanbanBoard cards={cardsList} />, document.getElementById("root"));
