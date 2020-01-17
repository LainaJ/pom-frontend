import React from "react";
import "./index.css";

class CreateUserForm extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitForm = e => {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
    });
    this.props.routerProps.history.push("/login");

    // .then(response => response.json())
    // .then(newTask => console.log(newTask))

    // this renders it to the screen:
    //   this.props.addNewUser({
    //     username: this.state.username,
    //     email: this.state.email,
    //     password: this.state.password
    //   })
  };

  render() {
    return (
      <div>
        <h1>Create An Account</h1>
        <form className="create-form" onSubmit={this.handleSubmitForm}>
          <label className="labels">Username: </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />
          <label className="labels">Email: </label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
          />
          <label className="labels">Password: </label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <input type="submit" value="Create Account" />
        </form>
      </div>
    );
  }
}

  export default CreateUserForm