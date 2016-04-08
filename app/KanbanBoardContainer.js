import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'my-string'
};


class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        fetch(API_URL+'/cards', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    addTask(cardId, taskName) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newTask = {id:Date.now(), name.taskName, done:false};
        let prevState = this.state;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });

        this.setState({cards:nextState});

        fetch('${API_URL}/cards/${cardId}/tasks', {
            method: 'add',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Server response wasn't OK")
            }
        })
        .then((responseData) => {
            newTask.id = responseData.id
            this.setState({cards:nextState});
        })
        .catch((error) => {
            this.setState(prevState);
        })
    }

    deleteTask(cardId, taskId, taskIndex) {
        // find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let prevState= this.state;
        // create a new object without the task
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]] }
            }
        });
        //set the component state to the mutated object
        this.setState({cards:nextState});

        //Call the API to remove the task
        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Server response wasn't OK")
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error)
            this.setState(prevState)
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);

        let newDoneValue;
        let prevState = this.state;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: { $apply: (done) => {
                            newDoneValue = !done
                            return newDoneValue;
                        }
                        }

                    }
                }
        });

        this.setState({cards:nextState});

        fetch('${API_URL}/cards/${cardIf}/tasks/{taskId}', {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Server response wasn't OK")
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error)
            this.setState(prevState)
        });
    }
    render() {
        return <KanbanBoard cards={this.state.cards}
        taskCallback={{
            toggle: this.toggleTask.bind(this),
            delete: this.deleteTask.bind(this),
            add: this.addTask.bind(this)
        }}
        />
    }
}

export default KanbanBoardContainer;
