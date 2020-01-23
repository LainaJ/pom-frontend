import React from 'react';
// import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/appbar'
import './index.css';
import 'typeface-roboto';
import Link from '@material-ui/core/link'


const link = {
    width: '120px',
    padding: '12px',
    margin: '6px 6px 6px 6px',
    // background: 'lightgrey',
    textDecoration: 'none',
    color: 'white',
    textAlign: 'center',
  }

class Navbar extends React.Component {
  render() {
    return (
      <div className="nav">
        {/* <AppBar position="fixed"> */}
        <NavLink
          to="/welcome"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Home
        </NavLink>
        {this.props.currentUser?
        
          <Link
          href="http://localhost:3001/welcome"
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Logout
        </Link>
       :
        <NavLink
          to="/login"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
          className="link"
        >
          Login
        </NavLink>}

        <NavLink
          to="/register"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Sign Up
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
        {/* <NavLink
          to="/calendar"
          exact
          style={link}
          activeStyle={{ background: "darkgrey" }}
        >
          Calendar
        </NavLink> */}
          
        {/* <p className="app-title">POM</p> */}
        {/* </AppBar> */}
      </div>
    );
  }
}

export default Navbar;