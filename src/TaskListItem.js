import React from 'react';
import './App.css';

class TaskListItem extends React.Component {



    
  render () {
    return (
        <div className="demo8-item">
            {this.props.task.description}
        </div>
    )
  }



}



export default TaskListItem;
