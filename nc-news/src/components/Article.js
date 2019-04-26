import React, { Component } from 'react';
import '../css/Article.css';
import * as api from './Api';

class Article extends Component {
  state = {
    article: {},
    comments: [],
    vote_inc: 0,
    input: ''
  };
  render() {
    const { vote_inc } = this.state;
    const { user } = this.props;
    const addCommentStatus = user ? 'addComment' : 'loginComment';
    const {
      title,
      topic,
      body,
      author,
      article_id,
      votes,
      comment_count
    } = this.state.article;
    return (
      <div className="Content">
        <div className="article">
          <h3>{title}</h3>
          <p>topic: {topic}</p>
          <p>body: {body}</p>
          <p>author: {author}</p>
          <p>
            <button
              id="up"
              onClick={() => {
                return this.handleArticleClick(1, article_id, 'article');
              }}
              disabled={vote_inc === 1}
            >
              {' '}
              Up{' '}
            </button>{' '}
            votes: {votes + vote_inc}{' '}
            <button
              id="down"
              onClick={() => {
                return this.handleArticleClick(-1, article_id, 'article');
              }}
              disabled={vote_inc === -1}
            >
              {' '}
              Down{' '}
            </button>
          </p>
          <p>comments: {comment_count}</p>
        </div>
        <div className="comments">
          <div>
            {!user && (
              <h3 id="login-label-comment">
                Please login to leave comments and vote for your favourite
                articles and comments
              </h3>
            )}
            <form className={addCommentStatus} onSubmit={this.handleSubmit}>
              <label id="label-comment">Have your say: </label>
              <br />
              <br />
              <textarea
                id="comment-text-area"
                placeholder="Please leave a comment ..."
                value={this.state.input}
                onChange={this.handleChange}
              />
              <br />
              <button id="comment-submit" type="submit" disabled={!user}>
                Add comment
              </button>
            </form>
          </div>

          {this.state.comments.map(comment => (
            <div key={comment.comment_id} className="containerComment">
              <p className="author">{comment.author}</p>
              <p className="body">{comment.body}</p>
              <p className="created">
                {new Date(comment.created_at).toString().slice(0, -34)}
              </p>
              {user === comment.author && (
                <p className="deleteComment">
                  <button onClick={() => this.handleDelete(comment.comment_id)}>
                    x
                  </button>
                </p>
              )}
              <p className="votes">
                <button
                  id="up"
                  onClick={() => {
                    return this.handleCommentClick(
                      1,
                      comment.comment_id,
                      'comment'
                    );
                  }}
                  disabled={this.state[comment.comment_id] === 1}
                >
                  {' '}
                  Up{' '}
                </button>{' '}
                votes:{' '}
                {this.state[comment.comment_id]
                  ? comment.votes + this.state[comment.comment_id]
                  : comment.votes}{' '}
                <button
                  id="down"
                  onClick={() => {
                    return this.handleCommentClick(
                      -1,
                      comment.comment_id,
                      'comment'
                    );
                  }}
                  disabled={this.state[comment.comment_id] === -1}
                >
                  {' '}
                  Down{' '}
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    await this.fetchArticleContent();
  };
  handleChange = event => {
    const inputValue = event.target.value;
    this.setState(() => {
      return {
        input: inputValue
      };
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { input } = this.state;
    const id = this.props.article;
    await api.postComment(this.props.user, input, id);
    await this.fetchArticleContent();
  };
  handleDelete = id => {
    api.deleteComment(id);
    const comments = this.state.comments.filter(
      comment => comment.comment_id !== id
    );
    this.setState(() => {
      return {
        comments
      };
    });
  };
  handleArticleClick = (inc, id, comp) => {
    if (!this.props.user) {
      return alert('Please login to submit your vote!');
    } else {
      this.setState(state => {
        return {
          vote_inc: state.vote_inc + inc
        };
      });
      api.updateVotes(inc, id, comp);
    }
  };
  handleCommentClick = (inc, id, comp) => {
    if (!this.props.user) {
      return alert('Please login to submit your vote!');
    } else {
      this.setState(state => {
        return {
          [id]: state[id] ? state[id] + inc : inc
        };
      });
      api.updateVotes(inc, id, comp);
    }
  };

  fetchArticleContent = async () => {
    try {
      const article = await api.getArticle(this.props.article);
      const articleComments = await api.getArticleComments(this.props.article);

      this.setState(state => {
        return {
          article: article,
          comments: articleComments,
          input: ''
        };
      });
    } catch (err) {
      const { navigate } = this.props;
      navigate('/errors/404', { replace: true });
    }
  };
}
export default Article;
