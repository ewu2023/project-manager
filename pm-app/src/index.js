import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

class TaskCard extends React.Component {
    handleClick(event) {
        event.preventDefault();
        this.props.printElement(this.props.parentIndex, this.props.index);
    }

    render() {
        console.log(this.props.taskName);
        return (
            <li key={this.props.index} className='card' onClick={(event) => this.handleClick(event)}>{this.props.taskName}</li>
        );
    }
}

class TaskList extends React.Component {
    addTask(taskName) {
        if (taskName === '') {
            return;
        }
        
        this.props.addTask(this.props.index, taskName);
    }

    render() {
        const tasks = this.props.tasks;
        const cardElements = tasks.map((task, i) => {
            return (
                <TaskCard 
                  taskName={task.name} 
                  key={task.name} 
                  index={i} 
                  parentIndex = {this.props.index}
                  printElement={this.props.printElement}
                />
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

    addList(listName) {
        if (listName === '') {
            return
        }

        const curLists = this.state.lists.slice();
        const newList = {
            listName: listName,
            tasks: []
        };

        this.setState({
            lists: curLists.concat([newList])
        });
    }

    addTask(listIndex, taskName) {
        // Retrieve list to append task to
        let allLists = this.state.lists.slice();
        const targetList = allLists[listIndex];
        const tasks = targetList['tasks'].slice();

        // Append the new task to the list
        const newTask = {name: taskName};
        tasks.push(newTask);

        // Update the target list
        allLists[listIndex] = {
            listName: targetList.listName,
            tasks: tasks
        };

        this.setState({
            lists: allLists
        });
    }

    render() {
        const taskLists = this.state.lists;
        const listElements = taskLists.map((taskList, i) => {
            return <TaskList 
              tasks={taskList.tasks} 
              listName={taskList.listName}
              addTask={(listIndex, taskName) => this.addTask(listIndex, taskName)}
              key={taskList.listName} 
              index={i}
            />
        });

        return (
            <div id='board'>
                <AddForm add={(listName) => this.addList(listName)} form_name={'Add List'}/>
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
        const listName = this.state.value;

        // Create new list 
        this.props.add(listName);

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