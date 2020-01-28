import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './index.css';

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmitLogin = e => {
    e.preventDefault()

    this.props.login({
      username: this.state.username
    })
    this.props.routerProps.history.push("/welcome");
  }

  render() {
    return (
      <div className="create-form">
        <form className="classes.root" onSubmit={this.handleSubmitLogin}>
        <div>
        <TextField 
        id="standard-basic"
              label="Username"
              type="text"
              name="username"
              onChange={e => this.handleChange(e)}
              value={this.state.username}
            />
          </div>
          <div>
          <TextField 
          id="standard-basic"
              label="Password"
              htmlFor="password"
              type="password"
              name="password"
              onChange={e => this.handleChange(e)}
              value={this.state.password}
            />
          </div>
          <br/>
          <Button type="submit" label="Login">Login</Button>
        </form>
        <br/>
        <Button onClick={() => this.props.routerProps.history.push("/register")}>
          No Account? Sign Up
        </Button>
      </div>
    )
  }
}

export default Login; 