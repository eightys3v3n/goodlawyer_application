import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
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
    this.setState({username: event.target.value});
  }

  handleSubmit(event) {
    console.log('Your login details are: ' + this.state.username);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Login" />
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
        </MuiThemeProvider>
      </div>
    );
  }
}

function App() {
  return createElement(LoginForm);
}
export default App;
