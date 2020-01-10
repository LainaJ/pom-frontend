import React from 'react';
// import ReactDOM from 'react-dom';
// import { NavLink } from 'react-router-dom';
import CreateUserForm from './CreateUserForm'
import './index.css';


class Login extends React.Component {

    state = {
        username: "",
        password: ""
      }
  
      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleSubmitLogin = (e) => {
        e.preventDefault()
  
        //render to frontend
        this.props.login({
            username: this.state.username,
          })
      }

        render () {
            return (
            <div>
                <form className="login-form" onSubmit={this.handleSubmitLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={ (e) => this.handleChange(e)} value={this.state.username} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={ (e) => this.handleChange(e)} value={this.state.password} />
                </div>
                <input type="submit" value="Login" />
                </form>
                <button onClick={() => this.props.showCreateUserForm()}> No Account? Register Here</button>
            </div>
            );
        };


    }

export default Login; 