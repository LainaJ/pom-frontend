import React, { Component } from 'react';
import './index.css';
import {Spring} from 'react-spring/renderprops'
import Typography from '@material-ui/core/typography'
import Link from '@material-ui/core/link'


class Welcome extends Component {

  render() {
    return (
      <Spring
        from={{
          opacity: 0,
          marginTop: -1000
        }}
        to={{
          opacity: .8,
          marginTop: 0
        }}
      >
        {props => (
          <div className="welcome-div" style={props}>
            <h1 className="welcome-div" id="welcome-header">Welcome to Pom</h1>
            {this.props.currentUser !== null ? (
              <p className="welcome-logged-in">
                You are currently logged in as{" "}
                <b>{this.props.currentUser.username}</b>.
              </p>
            ) : (
              <p className="welcome-logged-in">
                You are not currently logged in.
                <Typography>
                  <Link onClick={() => this.props.routerProps.history.push("/login")}>Login</Link> or 
                  <Link onClick={() => this.props.routerProps.history.push("/register")}> Sign Up</Link>
                </Typography>
              </p>
            )}
          </div>
        )}
      </Spring>
    );
  }
}

export default Welcome