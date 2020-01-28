import React from "react";
import "./index.css";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import DateRangeIcon from '@material-ui/icons/DateRange';


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
        <p>Due: {this.props.task.urgency}</p>
        {/* {this.props.currentUser !== null ? (
          <IconButton edge="end">
            <EditIcon onClick={() => null} />
          </IconButton>
        ) : null} */}
        {this.props.task.category === "wip"?
        <IconButton edge="end" >
          <AccessAlarmIcon
            onClick={() => this.props.routerProps.history.push("/pomodoro")}
            />
        </IconButton>: null}
        {this.props.task.category === "wip"?
        <IconButton edge="end" >
          <DateRangeIcon
            onClick={() => this.props.routerProps.history.push({
              pathname: "/calendar",
              state: {detail: this.props.task}})}
            />
        </IconButton>: null}
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon
            onClick={e => this.handleDeleteTask(e, this.props.task)}/>
        </IconButton>
        
      </div>
    );
  }
}



export default TaskListItem;
