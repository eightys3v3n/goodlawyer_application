import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
        <Switch>
          <Route path="/login">
            <NavBar />
            <Login />
          </Route>
          <Route path="/register">
            <NavBar />
            <Register />
          </Route>
          <Route path="/secret">
            <NavBar />
            <Secret />
          </Route>
          <Route path="/logout">
            <NavBar />
            <Logout />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
