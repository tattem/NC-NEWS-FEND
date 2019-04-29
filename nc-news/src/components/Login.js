import React, { Component } from 'react';

class Login extends Component {
    state= {
        input: ''
    }
  render() {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="username" value={this.state.input} onChange={this.handleChange} />
        <button type="submit"> Log in </button>
      </form>
    );
  }
  handleChange = event => {
    const inputValue = event.target.value;
    this.setState(() => {
      return {
        input: inputValue
      };
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    this.props.login(input)
  };
}

export default Login;
