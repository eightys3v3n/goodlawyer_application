import { useState } from 'react';


// All the functions to handle token session management.
// Utilized by assigning the returns to variables.
// One can check the token, null if none, set the token and remove the token.
export default function Token() {
  const getToken = () => {
    const tokenStr = sessionStorage.getItem('token');
    const token = JSON.parse(tokenStr);
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
