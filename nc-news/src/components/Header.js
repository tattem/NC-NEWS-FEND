import Nav from './Nav';
import Login from './Login';
import "../css/Header.css";
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="Header">
      <Nav />
      <div className="heading">
        <p>NC-News</p>
      </div>
      {/* add user as ternary here for login */}
      {this.props.user ? <div><p className="login" id="logged">Welcome {this.props.user}!</p><p><button onClick={this.props.logout}>Log out</button></p></div> : <Login className="login" login={this.props.login}/>}
    </div>
    );
  }
}

export default Header;
