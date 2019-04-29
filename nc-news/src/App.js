import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import Footer from './components/Footer';
import Error from './components/Error';
import './App.css';
import * as api from './components/Api';

class App extends Component {
  state = {
    user: null,
    loginFailed: false
  };

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} login={this.login} logout={this.logout}/>
        <Router className="main">
          <Articles path="/" />
          <Articles path="/:topic/articles" />
          <Article user={this.state.user} path="/:article" />
          <Error default />
        </Router>
        <Footer />
      </div>
    );
  }
  login = async username => {
    const user = await api.getUser(username);
    this.setState(() => {
      return {
        user: user.username
      };
    });
  };
  logout = () => {
    this.setState(() => {
      return {
        user: null
      }
    })
  }
}

export default App;
