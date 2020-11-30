import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";
import logoWhite from "../../images/logoWhiteTxt.svg";

function RegistrationForm(props) {
  const [state, setState] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      props.showError(null);

      const payload = {
        email: state.email,
        password: state.password,
        phone: state.phone
      };

      axios
        .post(API_BASE_URL + "/user/signup", payload)
        .then(function (response) {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
            props.showError(null);
          } else {
            props.showError("Some error occurred");
          }
        })
        .catch(function (error) {
          if (error.response.data.msg) {
            props.showError(error.response.data.msg);
          } else if (error.response.data.errors[0].msg) {
            props.showError(error.response.data.errors[0].msg);
          } else {
            props.showError("Some error occurred");
          }
        });
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
  };
  return (
    <div className="container">
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
            type="phone"
            className="input-field"
            id="phone"
            placeholder="Mobilnummer"
            value={state.phone}
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
          <input
            type="password"
            className="input-field"
            id="confirmPassword"
            placeholder="Bekräfta lösenord"
            value={state.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="submit-btn"
            onClick={handleSubmitClick}
          >
            Registrera
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
          <span>Already have an account? </span>
          <span className="loginText" onClick={() => redirectToLogin()}>
            Login here
          </span>
        </div>
      </div>
      <div className="green-box" />
    </div>
  );
}

export default withRouter(RegistrationForm);
