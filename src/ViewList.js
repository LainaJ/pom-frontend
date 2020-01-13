import React from 'react';
import TaskListItem from './TaskListItem';
import './index.css';
import CreateTaskForm from './CreateTaskForm'
// import {Motion, spring} from 'react-motion';
// import { range } from 'lodash';


class ViewList extends React.Component {

    renderTasks = () => {
      console.log(this.props.allTasks)
      console.log(this.props.sortedByDate)

      if (this.props.currentUser !== null) {
       let onlyUserTasks = this.props.allTasks.filter(task => task.user_id === this.props.currentUser.id)
       return onlyUserTasks.map(task => <li><TaskListItem 
          task={task}
          deleteTask={this.props.deleteTask}
          /></li> )
        }
    }

    render() {
      return (
        <div>
          <div>
            <h1>{this.props.currentUser.username}'s To-Do</h1>
            <ul>{this.renderTasks()}</ul>
            {this.props.currentUser !== null? 
            <button onClick={() => this.props.showTaskForm()}>Add Task</button>:null}
            {this.props.currentUser !== null? 
            <button onClick={() => this.props.sortByDate()}>Prioritize!</button>:null}
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
