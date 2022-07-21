import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

class TaskCard extends React.Component {
    render() {
        return (
            <li key={this.props.taskName} class='card'>{this.props.taskName}</li>
        );
    }
}

class TaskList extends React.Component {
    render() {
        const tasks = this.props.tasks;
        const cardElements = tasks.map((task) => {
            return (
                <TaskCard taskName={task.name} />
            );
        });

        return (
            <ul class='list'>
                <h2>{this.props.listName}</h2>
                {cardElements}
            </ul>
        );
    }
}

class TaskBoard extends React.Component {
    render() {
        const taskLists = this.props.lists;
        const listElements = taskLists.map((taskList) => {
            return <TaskList tasks={taskList.tasks} listName={taskList.taskName} />
        });

        return (
            <div class='board'>
                {listElements}
            </div>
        );
    }
}

const tasks_1 = [
    {name: 'Task 1'},
    {name: 'Task 2'}
];

const tasks_2 = [
    {name: 'Complete UI'},
    {name: 'Complete Backend'}
];

const tasks_3 = [
    {name: 'Deliver Pizza'}
];

const task_lists = [
    {
        taskName: 'To Do',
        tasks: tasks_1
    },

    {
        taskName: 'In Progress',
        tasks: tasks_2
    },

    {
        taskName: 'Completed',
        tasks: tasks_3
    }
];

class App extends React.Component {
    render() {
        return (
            <div id='App'>
                <TaskBoard lists={task_lists} />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);