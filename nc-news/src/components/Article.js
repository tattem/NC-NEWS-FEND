import React, { Component } from 'react';
import '../css/Article.css';
import * as api from './Api';

class Article extends Component {
  state = {
    article: {},
    comments: []
  };
  render() {
    return (
      <div className="Content">
        <div className="article">
          <p>{this.state.article.title}</p>
          <p>{this.state.article.topic}</p>
          <p>{this.state.article.body}</p>
          <p>{this.state.article.author}</p>
          <p>{this.state.article.votes}</p>
          <p>{this.state.article.comment_count}</p>
        </div>
        <div className="comments">
          <div className="addComment">place holder for add comments</div>
          {this.state.comments.map(comment => (
            <div key="comment.comment_id" className="containerComment">
              <p className="author">{comment.author}</p>
              <p className="body">{comment.body}</p>
              <p className="created">
                {Date(comment.created_at).slice(0, -34)}
              </p>
              <p className="votes">votes</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    await this.fetchArticleContent();
  };

  fetchArticleContent = async () => {
    try {
      const article = await api.getArticle(this.props.article);
      console.log(article, '<< article data');
      const articleComments = await api.getArticleComments(this.props.article);
      console.log(articleComments, '<< articleComments data');

      this.setState(state => {
        return {
          article: article,
          comments: articleComments
        };
      });
    } catch (err) {}
  };
}
export default Article;
