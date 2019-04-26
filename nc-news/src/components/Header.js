import Nav from './Nav';
import Login from './Login';
import "../css/Header.css";
import React, { Component } from 'react';

class Header extends Component {
  render() {
    console.log(this.props.user, '<< user header')
    return (
      <div className="Header">
      <Nav />
      <h1 className="heading">This is a header</h1>
      {/* add user as ternary here for login */}
      {this.props.user ? <p className="login" id="logged">Welcome {this.props.user}!</p> : <Login className="login" login={this.props.login}/>}
    </div>
    );
  }
}

export default Header;
