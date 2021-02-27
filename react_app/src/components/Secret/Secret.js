import React, { useState, Component } from 'react';

// import './Secret.css';

import Login from "../Login/Login";

export default function Secret() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <h1>Secret</h1>
  );
}
