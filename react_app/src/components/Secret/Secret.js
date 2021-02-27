import React, { useState } from 'react';

// import './Secret.css';

import Login from "../Login/Login";
import Token from "../App/Token";


export default function Secret() {
  const { token, setToken, removeToken } = Token();
  console.log("Using token "+token);

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div>
      <h1>Secret</h1>
      <p>You can only view this page if you are logged in.</p>
    </div>
  );
}
