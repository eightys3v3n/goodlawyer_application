import './App.css';
import React from 'react';

class LoginForm extends React.Component {
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
        <header className="Login">
          <h1>Login to my page</h1>
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
  let login_form = new LoginForm();
  return login_form.render();
}
export default App;
