import React from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import './index.css';

const link = {
    width: '120px',
    padding: '12px',
    margin: '6px 6px 6px 6px',
    background: 'lightgrey',
    textDecoration: 'none',
    color: 'white',
    textAlign: 'center'
  }

class Navbar extends React.Component {
  render() {
    return (
      <div className="nav">
        {/* <NavLink to="/login" exact style={link} activeStyle={{background: 'darkgrey'}}>{this.props.username !== ""? this.props.username: "Login"}</NavLink>
          <NavLink to="/welcome" exact style={link} activeStyle={{background: 'darkgrey'}}>Explore </NavLink>
            {/* set exact so it knows to only set activeStyle when route is deeply equal to link
            styling to Navlink 
            prop for activeStyle */}
        <NavLink
          to="/login"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Register
        </NavLink>
        <NavLink
          to="/list"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          List
        </NavLink>
        <NavLink
          to="/pomodoro"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Pomodoro
        </NavLink>
        <NavLink
          to="/welcome"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Home
        </NavLink>

          
        {/* <p className="app-title">POM</p> */}
      </div>
    );
  }
}

export default Navbar;