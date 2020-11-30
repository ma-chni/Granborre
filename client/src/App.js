import React, { useState } from 'react';
//import styled from 'styled-components';
import './App.css';
//import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import AlertComponent from './components/AlertComponent/AlertComponent';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Menu from './components/Menu/Menu';


function App() {
  const [updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/menu">
              <Menu />
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
    </Router>
  )
}
export default App;


