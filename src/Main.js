import React from 'react';
import ReactDOM from 'react-dom';
// import Demo from './Demo'
import ViewList from './ViewList'
import './index.css';

class Main extends React.Component {

    state = {
        allTasks: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/tasks')
        .then(resp => resp.json())
        .then(taskData => this.setState({
            allTasks: taskData
        })
        )
        }


    render() {
        return (
            <div id = "content">
                <ViewList allTasks={this.state.allTasks}/>
            </div>
        )
    }

}


export default Main;
