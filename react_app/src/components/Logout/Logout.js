import React, { useState } from 'react';
import Token from "../App/Token";

// import './Logout.css';


export default function Logout() {
  const { token, setToken, removeToken } = Token();

  removeToken();

  return (
    <div>
      <header className="Logout">
        <h1>Logout</h1>
        <title>Logout</title>
      </header>
      <section>
      <p>You have logged out</p>
      </section>
    </div>
  );
}
