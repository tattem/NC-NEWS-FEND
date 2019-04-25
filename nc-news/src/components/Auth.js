import React, { Component } from 'react';

class Auth extends Component {
  state = {
    username: ''
  };

  render() {
    const { username } = this.state;
    const { user, children } = this.props;
    return user ? (
      children
    ) : (
      <form onSubmit={this.handleSubmit}>
        <label>Username:</label>
        <input value={username} onChange={this.handleChange} id="username" />
        <button type="submit">Login</button>
      </form>
    );
  }
  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state.username);
  };
}

export default Auth;
