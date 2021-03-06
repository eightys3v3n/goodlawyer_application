import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import NavBar from "../NavBar/NavBar";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Secret from "../Secret/Secret";
import Logout from "../Logout/Logout";


export default function App() {
  return (
    <div className="wrapper">
      <h1>Login App</h1>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/secret">
            <Secret />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
