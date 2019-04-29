import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../css/Content.css';
import * as api from './Api';

class Articles extends Component {
  state = {
    articles: [],
    topFive: [],
    sortby: null,
    loading: true
  };
  render() {
    if (this.state.loading) {
      return <h2>loading...</h2>;
    }
    return (
      <div>
        {this.props.topic ? (
          <div>
            <h3>Articles on {this.props.topic}</h3>
            <p>
              sort by:{' '}
              <button onClick={() => this.sortClicked('votes')}>Votes</button>
              <button onClick={() => this.sortClicked('')}>most recent</button>
            </p>
          </div>
        ) : (
          <div className="title-container">
            <h3>All Articles</h3>
            <p>
              sort by:
              <button onClick={() => this.sortClicked('votes')}>Votes</button>
              <button onClick={() => this.sortClicked('')}>most recent</button>
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
                  <p>{new Date(article.created_at).toString().slice(0, -34)}</p>
                  <p>Votes: {article.votes}</p>
                  <p>
                    <Link to={`/${article.article_id}`}> read more...</Link>
                  </p>
                </li>
              </div>
            ))}
          </ul>
          <div className="comment-container">
            <h3 className="commentsHeading">The Hot 5</h3>

            <ol className="details">
              {this.state.topFive.map(article => (
                <li key={'x' + article.article_id}>
                  <h2>{article.title}</h2>
                  <p>Author: {article.author}</p>
                  <p>{new Date(article.created_at).toString().slice(0, -34)}</p>
                  <p>Votes: {article.votes}</p>
                  <p className="hotBody">
                    {article.body.slice(0, 200)}
                    <Link to={`/${article.article_id}`}> read more...</Link>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.topic !== prevProps.topic) {
      this.setState(() => {
        return {
          sortBy: null,
          loading: true
        };
      });
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
  };

  fetchArticles = async () => {
    try {
      const articles = await api.getArticles(
        this.props.topic,
        this.state.sortBy
      );
      const topFive = await api.getArticles(this.props.topic, 'comment_count');

      if (articles.length) {
        this.setState(state => {
          return {
            articles: articles,
            topFive: topFive.slice(0, 5),
            loading: false
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
