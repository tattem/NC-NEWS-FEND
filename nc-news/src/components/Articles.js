import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../css/Content.css';
import * as api from './Api';

class Articles extends Component {
  state = {
    articles: [],
    topFive: [1, 2, 3, 4, 5, 6]
  };
  render() {
    return (
      <div className="Content">
        <ul className="list">
          {this.state.articles.map(article => (
            <li key={article.article_id}>
              <Link to={`/${article.article_id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
        <ul className="details">
          {this.state.topFive.map(article => (
            <li key={article}>{article}</li>
          ))}
        </ul>
      </div>
    );
  }
  componentDidMount = async () => {
    await this.fetchArticles();
  };

  componentDidUpdate = async (prevProps, prevState) => {
      if(this.props.topic !== prevProps.topic) {
        await this.fetchArticles();   

      }
  }
  

  fetchArticles = async () => {
    try {
      const articles = await api.getArticles(this.props.topic);
      this.setState(state => {
        return {
          articles: articles
        };
      });
    } catch (err) {}
  };
}

export default Articles;
