import './App.css';
import React, { createElement, Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'username',
      password: 'password',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    // ES6 only.
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log('Your login details are: ' + this.state.username + ':' + this.state.password);
    event.preventDefault();

    fetch("http://localhost:3000/api/login")
      .then(res => res.json())
      .then((result) => {
        if (result.success !== true) {
          alert("WRONG");
        } else {
          alert("success :D");
        }},
        (error) => {
          alert("Errors errors errors");
        }
      );
  }

  render() {
    return (
      <div>
        <header className="Login">
          <h1>Login to my page</h1>
          <title>Login</title>
        </header>
        <section id="login_form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={this.state.value}
                onChange={this.handleChange} />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.value}
                onChange={this.handleChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </section>
      </div>
    );
  }
}

function App() {
  return createElement(LoginForm);
}
export default App;
