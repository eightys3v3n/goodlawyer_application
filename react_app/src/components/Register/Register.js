import React, { useState } from 'react';

import './Register.css';


// Utilizes the API to register a new user
async function registerUser(creds) {
  return fetch('https://localhost:3080/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(creds)
  })
    .then(data => data.json());
}


// Displays a registration page
export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();

  const handleSubmit = async event => {
    event.preventDefault();

    const res = await registerUser({
      username,
      password
    });

    console.log(res);

    if (res.success) {
      alert("Successfully registered");
    } else {
      alert("Failed to register: "+res.status);
    }
  }

  return (
    <div className="root">
      <header className="Register">
        <h2>Register</h2>
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
          <label>
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirm_password"
            onChange={e => setConfirmPassword(e.target.value)} />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}
