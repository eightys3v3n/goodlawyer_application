import React, { useState } from 'react';
import Token from "../App/Token";

import './Logout.css';


export default function Logout() {
  const { token, setToken, removeToken } = Token();

  removeToken();

  return (
    <div className="root">
      <header className="Logout">
        <h2>Logout</h2>
      </header>
      <section className="body">
        <p>You have logged out</p>
      </section>
    </div>
  );
}
