import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

class TaskCard extends React.Component {
    render() {
        return (
            <li key={this.props.index} className='card'>{this.props.taskName}</li>
        );
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: this.props.tasks
        };
    }

    addTask(taskName) {
        if (taskName === '') {
            return;
        }

        const tasks = this.state.tasks;
        const newTask = {name: taskName};

        this.setState({
            tasks: tasks.concat([newTask])
        });
    }

    render() {
        const tasks = this.state.tasks;
        const cardElements = tasks.map((task, i) => {
            return (
                <TaskCard taskName={task.name} key={task.name} index={i} />
            );
        });

        return (
            <ul className='list'>
                <h3>{this.props.listName}</h3>
                {cardElements}
                <br />
                <li key={this.props.listName + '-add'}> 
                  <AddForm add={(taskName) => this.addTask(taskName)} form_name='Add Task' /> 
                </li>
            </ul>
        );
    }
}

class TaskBoard extends React.Component {
    constructor(props) {
        super(props);

        // Lists will initially be passed in as props
        this.state = {
            lists: this.props.lists
        };
    }

    addList(list_name) {
        if (list_name === '') {
            return
        }

        const curLists = this.state.lists.slice();
        const newList = {
            taskName: list_name,
            tasks: []
        };

        this.setState({
            lists: curLists.concat([newList])
        });
    }

    render() {
        const taskLists = this.state.lists;
        const listElements = taskLists.map((taskList) => {
            return <TaskList tasks={taskList.tasks} listName={taskList.taskName} key={taskList.taskName} />
        });

        return (
            <div id='board'>
                <AddForm add={(list_name) => this.addList(list_name)} form_name={'Add List'}/>
                <div className='list-view'>{listElements}</div>
            </div>
        );
    }
}

class AddForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        // Retrieve list name from text box
        const list_name = this.state.value;

        // Create new list 
        this.props.add(list_name);

        // Reset text box
        this.setState({
            value: ''
        });
    }

    render() {
        return (
            <form className='center' onSubmit={(event) => this.handleSubmit(event)}>
                <label>
                    <input type='text' onChange={(event) => this.handleChange(event)} value={this.state.value} />
                    <button>{this.props.form_name}</button>
                </label>
            </form>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div id='App'>
                <TaskBoard lists={[]} />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);