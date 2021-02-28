import React, { useState } from 'react';

import './Secret.css';

import Login from "../Login/Login";
import Token from "../App/Token";


export default function Secret() {
  const { token, setToken, removeToken } = Token();
  console.log("Using token "+token);
  let content = null;

  if (!token) {
    content = (
      <section className="body">
        <p>Please login to view this page</p>
        <Login setToken={setToken}/>
      </section>
    );
  } else {
    content = (
    <section className="body">
      <p>You are logged in, great!</p>
    </section>
    );
  }

  return (
    <div className="root">
      <header className="Secret">
        <h2>Secret</h2>
      </header>
      {content}
    </div>
  );
}
