import React, { Component } from 'react';
import './index.css';

class Welcome extends Component {

  render() {
    return (
      <div className="welcome-div">
          <h1 id="welcome-header">Welcome to Pom</h1>
          {this.props.currentUser !== null?
          <p className="welcome-logged-in">You are currently logged in as <b>{this.props.currentUser.username}</b>.</p>:
          <p className="welcome-logged-in">You are not currently logged in. Login or Create an Account!</p>} 
      </div>
    )
  }
}

export default Welcome