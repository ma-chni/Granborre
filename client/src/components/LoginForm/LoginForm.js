import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import logoWhite from "../../images/logoWhiteTxt.svg";
import { API_BASE_URL } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "/user/login", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          redirectToHome();
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Invalid email/password");
        } else {
          props.showError("Invalid email/password");
        }
      })
      .catch(function (error) {
        if (error.response.data.message === "error") {
            props.showError("Invalid email/password. Please try again");
        }
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <div className="container container-bg">
      <img src={logoWhite} className="App-logo" alt="logo" />
      <div className="outer-div">
        <form>
          <input
            type="email"
            className="input-field"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Epostaddress"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="input-field"
            id="password"
            placeholder="Lösenord"
            value={state.password}
            onChange={handleChange}
          />
          <div className="form-check"></div>
          <button
            type="submit"
            className="submit-btn"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </form>
        <div
          className="alert alert-success mt-2"
          style={{ display: state.successMessage ? "block" : "none" }}
          role="alert"
        >
          {state.successMessage}
        </div>
        <div className="message-box">
          <span>Dont have an account? </span>
          <span className="loginText" onClick={() => redirectToRegister()}>
            Register
          </span>
        </div>
      </div>
      <div className="green-box" />
    </div>
  );
}

export default withRouter(LoginForm);
