import React from "react";
import "./index.css";

class TaskListItem extends React.Component {
  handleDeleteTask = (e, task) => {

    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      }
    });
    this.props.deleteTask(task);
  };

  render() {
    return (
      <div className="task-item">
        <p>{this.props.task.description}</p>
        <p>Importance: {this.props.task.importance}</p>
        <p>Urgency: {this.props.task.urgency}</p>
        <button onClick={e => null}>Edit Task</button>
        <button onClick={e => this.handleDeleteTask(e, this.props.task)}>
          X
        </button>
      </div>
    );
  }
}



export default TaskListItem;
