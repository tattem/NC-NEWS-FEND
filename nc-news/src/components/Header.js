import React from 'react';
import Nav from './Nav';
import Login from './Login';
import "../css/Header.css";

const Header = () => {
  return (
    <div className="Header">
      <Nav />
      <h1 className="heading">This is a header</h1>
      <Login />
    </div>
  );
};

export default Header;
