import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../css/Content.css';
import * as api from './Api';

class Articles extends Component {
  state = {
    articles: [],
    topFive: [1, 2, 3, 4, 5, 6],
    sortby: ''
  };
  render() {
    return (
      <div>
        {this.props.topic ? (
          <div>
            <h3>Articles on {this.props.topic}</h3>
            <p>
              sort by: <button>comments</button>
              <button>likes</button>
            </p>
          </div>
        ) : (
          <div className="title-container">
            <h3>All Articles</h3>
            <p>
              sort by: <button onClick={()=> this.sortClicked("comment_count")}>comments</button>
              <button>likes</button>
            </p>
          </div>
        )}

        <div className="Content">
          <ul className="list">
            {this.state.articles.map(article => (
              <div>
                <li key={article.article_id}>
                  <h2>{article.title}</h2>
                  <p>Author: {article.author}</p>
                  <p>
                    <Link to={`/${article.article_id}`}> read more...</Link>
                  </p>
                </li>
              </div>
            ))}
          </ul>
          <ul className="details">
            {this.state.topFive.map(article => (
              <li key={article}>{article}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.topic !== prevProps.topic) {
        this.fetchArticles();
    } else if (this.state.sortBy !== prevState.sortBy) {
        // next step is to build a query in the get articles api that handles sort by
        this.fetchArticles();
    }
  };

  sortClicked = sort => {
    this.setState(() => {
        return {
          sortBy: sort
        };
      });
  }

  fetchArticles = async () => {
    try {
      const articles = await api.getArticles(this.props.topic, this.state.sortBy);
      if (articles.length) {
        this.setState(state => {
          return {
            articles: articles
          };
        });
      } else {
        const { navigate } = this.props;
        navigate('/errors/404', { replace: true });
      }
    } catch (err) {}
  };
}

export default Articles;
