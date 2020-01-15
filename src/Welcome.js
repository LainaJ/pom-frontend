import React, { Component } from 'react';
import './index.css';

class Welcome extends Component {

  render() {
    return (
      <div>
          <h1 id="welcome-header">Welcome to Pom</h1>

          {this.props.currentUser !== null?
          <p id="welcome-logged in">You are currently logged in as {this.props.currentUser.username}.</p>:
            <p id="welcome-logged in">You are not currently logged in. Login or Create an Account!</p>} 
      </div>
    )
  }
}

export default Welcome