import { useState } from 'react';


export default function Token() {
  console.warn("Currenty not validating login tokens on the server. Any non-null token is accepted");


  const getToken = () => {
    const tokenStr = sessionStorage.getItem('token');
    const token = JSON.parse(tokenStr);
    console.log("Got token "+token);
    return token;
  };

  const [token, setToken] = useState(getToken());

  const removeToken = () => {
    sessionStorage.removeItem('token');
  };

  const saveToken = token => {
    sessionStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  };

  return {
    token,
    setToken: saveToken,
    removeToken: removeToken,
  };
}
