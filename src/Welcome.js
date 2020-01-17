import React, { Component } from 'react';
import './index.css';
import {Spring} from 'react-spring/renderprops'


class Welcome extends Component {

  render() {
    return (
      <Spring
      from={{
        // Start invisible and offscreen
        opacity: 0, marginTop: -1000,
      }}
      to={{
        // End fully visible and in the middle of the screen
        opacity: 1, marginTop: 0,
      }}
    >
{ props => (
      <div className="welcome-div" style={props}>
          <h1 id="welcome-header">Welcome to Pom</h1>
          {this.props.currentUser !== null?
          <p className="welcome-logged-in">You are currently logged in as <b>{this.props.currentUser.username}</b>.</p>:
          <p className="welcome-logged-in">You are not currently logged in. Login or Create an Account!</p>} 
      </div>
)}
      </Spring>
    )
  }
}

export default Welcome