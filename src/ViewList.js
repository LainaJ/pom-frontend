import React from 'react';
import TaskListItem from './TaskListItem';
import './index.css';
import CreateTaskForm from './CreateTaskForm'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Spring} from 'react-spring/renderprops'
// import {TransitionMotion, spring, presets} from 'react-motion'; own thing with spme using react router
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';


// const styles = withStyles(theme => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

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

  renderPrioritized = () => {
    let wipPrioritized = this.props.usersPrioritizedTasks.filter(task => task.category === "wip")
          return wipPrioritized.map(task => (
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
                routerProps={this.props.routerProps}
              />
            </div>
          ))
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
          routerProps={this.props.routerProps}
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
    // const { classes } = this.props; 
    return (
      <div className="main">
        <div className="container-drag">
          <Spring
            from={{
              opacity: 0,
              marginTop: -1000
            }}
            to={{
              opacity: 1,
              marginTop: 60
            }}
          >
            {props => (
              <div
                className="wip"
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => {
                  this.onDrop(e, "wip");
                }}
                style={props}
              >
                <span className="task-header">
                  {this.props.currentUser.username}'s To-Dos
                </span>
                {this.props.havePrioritized === false
                  ? this.renderTodos()
                  : this.renderPrioritized()}
                {this.props.currentUser !== null ? (
                  <IconButton edge="end">
                    <AddIcon onClick={() => this.props.showTaskForm()} />
                  </IconButton>
                ) : null}
                <FormControlLabel
                  value="Prioritize"
                  control={
                    <Switch
                      color="secondary"
                      onChange={() => this.props.prioritize()}
                    />
                  }
                  label="Prioritize"
                  labelPlacement="start"
                />
              </div>
            )}
          </Spring>

          <Spring
            from={{
              opacity: 0,
              marginTop: -1000
            }}
            to={{
              opacity: 1,
              marginTop: 60
            }}
          >
            {props => (
              <div
                className="droppable"
                onDragOver={e => this.onDragOver(e)}
                onDrop={e => this.onDrop(e, "complete")}
                style={props}
              >
                <span className="task-header">COMPLETED</span>
                {this.props.userTasks.length > 0 && this.props.complete !== []
                  ? this.renderComplete()
                  : null}
              </div>
            )}
          </Spring>
        </div>
        {/* end container drag */}
      
        {this.props.newFormOpen ? (
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.showTaskForm}
        onClose={this.props.showTaskForm}
        style={{alignItems:'center',justifyContent:'center'}}
      >
        <div className="modal-size" >
          {this.props.newFormOpen ? (
            <CreateTaskForm
              addNewTask={this.props.addNewTask}
              currentUser={this.props.currentUser}
            />
          ) : null}
        </div>
        </Modal>
        ) : null}
      </div>
    );
  }
}


export default ViewList;
