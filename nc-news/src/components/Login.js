import React, { Component } from 'react';

class Login extends Component {
    state= {
        input: ''
    }
  render() {
      console.log(this.state.input)
    return (
      <form className="login" onSubmit={this.handleSubmit}>
      {/* needs to have a state recording the username like a normal input */}
        <label>Log in</label>
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
