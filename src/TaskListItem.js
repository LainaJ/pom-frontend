import React from 'react';
import './index.css';

class TaskListItem extends React.Component {




  render () {
    return (
        <div className="task-item">
            <p>{this.props.task.description}</p>
            <p>Importance: {this.props.task.importance}</p>
            <button onClick={(e) => null }>Edit Task</button>
        </div>
    )
  }



}



export default TaskListItem;
