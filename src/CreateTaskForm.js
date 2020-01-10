import React from 'react'
import './index.css';

  class CreateTaskForm extends React.Component {

    state = {
      description: "", 
      importance: 0, 
      urgency: 0,
      predicted_pom: 0    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmitForm = (e) => {
      e.preventDefault()

      fetch('http://localhost:3000/api/v1/tasks', { 
      method: 'POST', 
      headers: {
        'content-type':'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        description: this.state.description,
        importance: this.state.importance,
        urgency: this.state.urgency,
        predicted_pom: this.state.predicted_pom, 
        user_id: this.props.currentUser.id
      })
      })
    // .then(response => response.json())
    // .then(newTask => console.log(newTask))

      // this renders it to the screen:
      this.props.addNewTask({
        description: this.state.description,
        importance: this.state.importance,
        urgency: this.state.urgency,
        predicted_pom: this.state.predicted_pom
      })
    }

    render() {
      return (
        <div>
          <h1>Add a Task</h1>
            <form className="create-form" onSubmit={this.handleSubmitForm}>
              <label className="labels">Task: </label>
              <input type='text' name="description" placeholder="(e.g., Write blog post)"
              value={this.state.description} 
              onChange={ (e) => this.handleChange(e)}
              />
              <label className="labels">Importance (1-5): </label>
              <input type='text' name="importance" placeholder="e.g., 5 - super important" 
              value={this.state.importance}
              onChange={ (e) => this.handleChange(e)}
              />
              <label className="labels">Urgency (1-5): </label>
              <input type='text' name="urgency" placeholder="e.g, 1 - can totally wait " 
              value={this.state.urgency}
              onChange={ (e) => this.handleChange(e)}
              />
              <label className="labels">Predicted Pomodoros: </label>
              <input type='text' name="predicted_pom" placeholder="e.g., 3" 
              value={this.state.image}
              onChange={ (e) => this.handleChange(e)}
              />
              <br/>
              <input type='submit' value='Add Task' />
            </form>
          </div>
      )
    }
  }

  export default CreateTaskForm