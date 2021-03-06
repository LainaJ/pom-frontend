import React from 'react'
import './index.css';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import dateFormat from 'dateformat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


  class CreateTaskForm extends React.Component {
    
    state = {
      description: "",
      importance: "",
      urgency: 0,
      predicted_pom: 0
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleDateChange = (date) => {
      this.setState({
        urgency: dateFormat(date, "mm/dd/yyyy")
      })
    }

    handleSubmitForm = (e, task) => {
      e.preventDefault();
   
      if (this.props.currentUser !== null) {
        fetch("http://localhost:3000/api/v1/tasks", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json"
          },
          body: JSON.stringify({
            description: this.state.description,
            importance: this.state.importance,
            urgency: this.state.urgency,
            predicted_pom: this.state.predicted_pom,
            user_id: this.props.currentUser.id,
            category: "wip",
            complete_status: false
          })
        })
          .then(response => response.json())
          .then(newTask => this.props.addNewTask(newTask));
        // this renders to screen:
        // this.props.addNewTask({
        //   description: this.state.description,
        //   importance: this.state.importance,
        //   urgency: this.state.urgency,
        //   predicted_pom: this.state.predicted_pom,
        //   user_id: this.props.currentUser.id
        // })
      } else {
        alert("You must first login.");
      }
    };

    render() {
      return (
        <div>
          <h1 className="add-task-header" >Add a Task</h1>
          <form onSubmit={this.handleSubmitForm}>
          <TextField id="standard-basic" label="Task" 
              className="new-todo"
              type="text"
              name="description"
              placeholder="(e.g., Write blog post)"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
              />
            <br />
            <TextField id="standard-basic" label="Importance (1-5)" 
              className="new-todo"
              type="text"
              name="importance"
              placeholder="e.g., 5 - super important"
              value={this.state.importance}
              onChange={e => this.handleChange(e)}
            />
            <br />
            <input
              type="hidden"
              name="urgency"
              value={this.state.urgency}
              // onChange={e => this.handleChange(e)}
            /> 
           <TextField id="standard-basic" label="Predicted Poms" 
              className="new-todo"
              type="text"
              name="predicted_pom"
              placeholder="e.g., 3"
              value={this.state.image}
              onChange={e => this.handleChange(e)}
            />
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Task Due Date"
                name="urgency"
                value={this.state.urgency}
                onChange={(e) => this.handleDateChange(e)}
              />
            </MuiPickersUtilsProvider>
            <br />
            <Button type="submit">Save Task </Button>
          </form>
        </div>
      );
    }
  }

  export default CreateTaskForm