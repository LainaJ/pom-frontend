import React from 'react';
import TaskListItem from './TaskListItem';
import './index.css';
import CreateTaskForm from './CreateTaskForm'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

// import {Motion, spring} from 'react-motion';
// import { range } from 'lodash';


class ViewList extends React.Component {


  state = {
    dense: false,
  }

  onDragStart = (ev, task) => {
    ev.dataTransfer.setData("id", task.id);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, category) => {
    let id = ev.dataTransfer.getData("id");
    // console.log(this.props.usersPrioritizedTasks)
    let tasks = this.props.userTasks.filter(task => {
      let newId = parseInt(id);
      if (task.id === newId) {
        task.category = category;
      }
      return task;
    })
    this.props.updateStateFromDrop(tasks)
    
    tasks.map(task => 
      fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify({
          category: task.category
        })
      }).then(response => response.json())
    )

  }//end onDrop

  renderTasks = () => {
    if (this.props.currentUser !== null) {
      return this.props.userTasks.map(task => (
        <div
          key={task.id}
          onDragStart={e => this.onDragStart(e, task)}
          draggable="true"
          className="draggable"
          task={task}
        >
          <TaskListItem
            key={task.id}
            task={task}
            deleteTask={this.props.deleteTask}
          />
        </div>
      ))
    }
    else if (this.props.currentUser !== null && this.props.havePrioritized === true) {
      return this.props.usersPrioritizedTasks.map(task => (
        <div
          key={task.id}
          onDragStart={e => this.onDragStart(e, task)}
          draggable="true"
          className="draggable"
          task={task}
        >
          <TaskListItem
            key={task.id}
            task={task}
            deleteTask={this.props.deleteTask}
          />
        </div>
      ))
    }
  }

  renderTodos = () => {
    let wip = this.props.userTasks.filter(task => task.category === "wip")
    return wip.map(task => (
      <div
        key={task.id}
        onDragStart={e => this.onDragStart(e, task)}
        draggable="true"
        className="draggable"
        task={task}
      >
     
        <TaskListItem
          key={task.id}
          task={task}
          deleteTask={this.props.deleteTask}
        />
      </div>
    ));
  };

  renderComplete = () => {
    let completed = this.props.userTasks.filter(task => task.category === "complete")
    return completed.map(task => (
      <div
        key={task.id}
        onDragStart={e => this.onDragStart(e, task)}
        draggable="true"
        className="draggable"
        task={task}
      >
        <TaskListItem
          key={task.id}
          task={task}
          deleteTask={this.props.deleteTask}
        />
      </div>
    ));
  };

  render() {

    return (
      <div className="main">
        <div className="container-drag">
          <div
            className="wip"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, "wip");
            }}
          >
            <span className="task-header">
              {this.props.currentUser.username}'s To-Dos
            </span>
            {this.props.userTasks.length > 0
              ? this.renderTodos()
              : this.renderTasks()}
            {this.props.currentUser !== null ? (
              <button onClick={() => this.props.showTaskForm()}>
                Add Task
              </button>
            ) : null}
            {this.props.currentUser !== null ? (
              <button onClick={() => this.props.prioritize()}>
                Prioritize
              </button>
            ) : null}
            {/* {this.props.currentUser !== null &&
            this.props.savePrioritized !== null ? (
              <button onClick={() => this.props.viewSavedPrioritized()}>
                Save Prioritized
              </button>
            ) : null}
            {this.props.currentUser !== null ? (
              <button onClick={() => this.props.editCompleted()}>
                Edit Completed
              </button>
            ) : null} */}
          </div>
          <div
            className="droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "complete")}
          >
            <span className="task-header">COMPLETED</span>
            {this.props.userTasks.length > 0 && this.props.complete !== []
              ? this.renderComplete()
              : null}
          </div>
        </div>
        <div className="create-form">
          {this.props.newFormOpen ? (
            <CreateTaskForm
              addNewTask={this.props.addNewTask}
              currentUser={this.props.currentUser}
            />
          ) : null}
        </div>
      </div>
    );
  }
}


export default ViewList;
