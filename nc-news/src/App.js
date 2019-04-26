import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import Footer from './components/Footer';
import './App.css';
import Auth from './components/Auth';
import * as api from './components/Api';


class App extends Component {
  state = {
    user: null,
    loginFailed: false
  };

  render() {
    console.log(this.state.user, '<< user app')
    return (
        <div className="App">
          <Header user={this.state.user} login={this.login}/>
          <Router className="main">
            <Articles path="/" />
            <Articles path="/:topic/articles" />
            <Article user={this.state.user} path="/:article" />
          </Router>
          <Footer />
        </div>
    );
  }
  login = async username => {
    const user = await api.getUser(username)
    console.log(user.username, '<< ran user')
    this.setState(()=> {
      return {
        user: user.username
      }
    })
  }
}

export default App;
