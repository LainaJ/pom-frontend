import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import 'typeface-roboto';
import Link from '@material-ui/core/link'
// import AppBar from '@material-ui/core/appbar'

const link = {
    width: '120px',
    padding: '12px',
    margin: '6px 6px 6px 6px',
    textDecoration: 'none',
    color: 'white',
    textAlign: 'center',
  }

class Navbar extends React.Component {
  render() {
    return (
      <div className="nav">
        <NavLink
          to="/welcome"
          exact
          style={link}
          activeStyle={{ background: '#F3DEC9' }}
          className="navlink"
        >
          Home
        </NavLink>
        {this.props.currentUser?
        
          <Link
          href="http://localhost:3001/welcome"
          style={link}
          activeStyle={{ background: '#F3DEC9'}}
          className="navlink"
        >
          Logout
        </Link>
       :
        <NavLink
          to="/login"
          exact
          style={link}
          activeStyle={{ background: '#F3DEC9' }}
          className="navlink"
        >
          Login
        </NavLink>}

        <NavLink
          to="/register"
          exact
          style={link}
          activeStyle={{ background: '#F3DEC9' }}
          className="navlink"
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/list"
          exact
          style={link}
          activeStyle={{ background: '#F3DEC9' }}
          className="navlink"
        >
          List
        </NavLink>
        <NavLink
          to="/pomodoro"
          exact
          style={link}
          activeStyle={{ background: '#F3DEC9' }}
          className="navlink"
        >
          Pomodoro
        </NavLink>
      </div>
    );
  }
}

export default Navbar;