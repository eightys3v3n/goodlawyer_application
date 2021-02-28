import React, { useState } from 'react';
import Token from "../App/Token";

import './Login.css';


// Utilizes the API to retrieve a login token
async function loginUser(creds) {
  return fetch('https://localhost:3080/login', {
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
  let token = null,
      removeToken = null;

  if (!setToken) {
    console.log("creating setToken");
    const tokenStuff = Token();
    token = tokenStuff[0];
    setToken = tokenStuff.setToken;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    const res = await loginUser({
      username,
      password
    });

    console.log(res);

    if (res.success) {
      setToken(res.token);
    } else {
      alert("Failed to login: "+res.status);
    }
  }

  return (
    <div className="root">
      <header className="Login">
        <h2>Login</h2>
      </header>
      <section className="body">
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
