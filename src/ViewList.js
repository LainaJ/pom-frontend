import React from 'react';
import TaskListItem from './TaskListItem';
import './index.css';
import CreateTaskForm from './CreateTaskForm'
// import {Motion, spring} from 'react-motion';
// import { range } from 'lodash';


class ViewList extends React.Component {
  onDragStart = (ev, task) => {
    // console.log("dragstart:", task);
    ev.dataTransfer.setData("id", task.id);
  };

  onDragOver = ev => {
    ev.preventDefault();
    // console.log("dragover:");
  };

  onDrop = (ev, category) => {
    // console.log("onDrop:");
    let id = ev.dataTransfer.getData("id");
    // console.log(this.props.usersPrioritizedTasks)
    let tasks = this.props.usersPrioritizedTasks.filter(task => {
      let newId = parseInt(id);
      if (task.id === newId) {
        // console.log(task);
        // console.log(id);
        task.category = category;
      }
      return task;
    });
    // this.setState({
    //     ...this.state,
    //     tasks
    // });
    this.props.updateStateFromDrop(tasks);
  };

  renderTasks = () => {
    console.log("renderingTasks once logged in")
    if (this.props.currentUser !== null) {
      let onlyUserTasks = this.props.allTasks.filter(
        task => task.user_id === this.props.currentUser.id
      );
      return onlyUserTasks.map(task => (
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
    }
  };

  renderSaved = () => {
    console.log("renderSaved:", this.props.usersPrioritizedTasks);
    console.log("completed tasks during renderSaved:", this.props.complete);
    console.log("completed tasks during renderSaved:", this.props.complete);
    let wip = this.props.usersPrioritizedTasks.filter(task => task.category === "wip")
    console.log("wip at renderSaved:", wip)
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
    let completed = this.props.complete;
    console.log("renderCompleted:", completed);
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
            {this.props.usersPrioritizedTasks.length > 0 &&
            this.props.wip !== []
              ? this.renderSaved()
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
            {this.props.currentUser !== null &&
            this.props.savePrioritized !== null ? (
              <button onClick={() => this.props.viewSavedPrioritized()}>
                Save Prioritized
              </button>
            ) : null}
            {this.props.currentUser !== null ? (
              <button onClick={() => this.props.editCompleted()}>
                Edit Completed
              </button>
            ) : null}
          </div>
          <div
            className="droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "complete")}
          >
            <span className="task-header">COMPLETED</span>
            {this.props.usersPrioritizedTasks.length > 0 &&
            this.props.complete !== []
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
