import React from 'react';
import TaskListItem from './TaskListItem';
import './index.css';
import CreateTaskForm from './CreateTaskForm'
// import {Motion, spring} from 'react-motion';
// import { range } from 'lodash';


class ViewList extends React.Component {


    renderTasks = () => {
        return this.props.allTasks.map(task => <li><TaskListItem 
          task={task}
          /></li> )
    }


    render() {
      return (
        <div>
          <div className="demo8">
            <ul>{this.renderTasks()}</ul>
            <button onClick={() => this.props.showTaskForm()}>Add Task</button>
          </div>
          <div>
            {this.props.newFormOpen? <CreateTaskForm 
            addNewTask={this.props.addNewTask} 
            currentUser={this.props.currentUser}
            />: null}
          </div>
        </div>
      )
  }





}



export default ViewList;
