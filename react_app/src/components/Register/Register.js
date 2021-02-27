import React, { useState, Component } from 'react';

// import './Register.css';


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
    <div>
      <header className="Register">
        <h1>Register</h1>
        <title>Register</title>
      </header>
      <section id="register_form">
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
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirm_password"
              onChange={e => setConfirmPassword(e.target.value)} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}
