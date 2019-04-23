import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import Footer from './components/Footer';
import './App.css';
// import Content from './components/Content';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router className="main">
          <Articles path="/" />
          <Articles path="/:topic/articles" />
          <Article path="/:article" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
