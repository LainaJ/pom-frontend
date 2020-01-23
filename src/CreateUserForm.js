import React from "react";
import "./index.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    },
  }
})

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
    // <Link href="http://localhost:3001/login"></Link>
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
    const { classes } = this.props;
    return (
      <div className="create-form">
        <h1>Create An Account</h1>
        <form className={classes.root} onSubmit={this.handleSubmitForm}>
          <TextField
          id="standard-basic"
            label="Username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={e => this.handleChange(e)}
          />

          <TextField
          id="standard-basic"
            label="Email"
            type="text"
            name="email"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />
          <br />
          <Button type="submit">Create Account</Button>
        </form>
      </div>
    );
  }
}


  export default withStyles(useStyles)(CreateUserForm)