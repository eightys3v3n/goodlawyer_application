import React, { useState } from 'react';
import Token from "../App/Token";

import './Login.css';


// Utilizes the API to retrieve a login token
async function loginUser(creds) {
  console.warn("Currenty not validating login tokens on the server. Any non-null token is accepted");
  return fetch('https://eighty7.ca:3080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(data => data.json());
}


// Displays a login page and allows the user to login, handling tokens
export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  if (!setToken) {
    const tokenStuff = Token();
    setToken = tokenStuff.setToken;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const res = await loginUser({
      username,
      password
    });

    if (res.success) {
      setToken(res.token);
      alert("Logged in successfully");
    } else {
      alert("Failed to login: "+res.status);
    }
  }

  return (
    <div class="body">
      <header className="Login">
        <h2>Login</h2>
      </header>
      <section className="login-body">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
          </label>
          <input
            type="text"
            name="username"
            onChange={e => setUserName(e.target.value)} />
          <label>
            Password:
          </label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}
