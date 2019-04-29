import Nav from './Nav';
import Login from './Login';
import '../css/Header.css';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Nav />
        <div className="heading">
          <p>C-News</p>
        </div>
        {/* add user as ternary here for login */}
        {this.props.user ? (
          <div className="login">
            <p id="logged">
              Welcome {this.props.user}!
            </p>
            <p>
              <button onClick={this.props.logout}>Log out</button>
            </p>
          </div>
        ) : this.props.failedUser ? (
          <div className="login">
            <Login login={this.props.login} />
            <p >Invalid user</p>
          </div>
        ) : (
          <Login login={this.props.login} />
        )}
      </div>
    );
  }
}

export default Header;
