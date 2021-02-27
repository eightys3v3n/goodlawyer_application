import React, { useState } from 'react';

// import './Secret.css';

import Login from "../Login/Login";
import Token from "../App/Token";


export default function Secret() {
  const { token, setToken } = Token();
  console.log("Using token "+token);

  if (!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <h1>Secret</h1>
    <p>Your login token is {token}<p/>
  );
}
