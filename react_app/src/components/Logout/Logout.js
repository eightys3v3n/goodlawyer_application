import React from 'react';
import Token from "../App/Token";

import './Logout.css';


// Logs a user out when browsed to
export default function Logout() {
  const tokenStuff = Token();

  tokenStuff.removeToken();

  return (
    <div>
      <header className="Logout">
        <h2>Logout</h2>
      </header>
      <section className="body">
        <p>You have logged out</p>
      </section>
    </div>
  );
}
