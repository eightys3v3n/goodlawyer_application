import React, { useState, Component } from 'react';

// import './Login.css';


async function loginUser(creds) {
  return fetch('https://localhost:3080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(data => data.json())
}


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async event => {
    event.preventDefault();

    const res = await loginUser({
      username,
      password
    });
    if (res.success) {
      setToken(res.token);
    } else {
      alert("Failed to login: "+res.status);
    }
  }

  return (
    <div>
      <header className="Login">
        <h1>Login</h1>
        <title>Login</title>
      </header>
      <section id="login_form">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              onChange={e => setUserName(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              onChange={e => setPassword(e.target.value)} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}
