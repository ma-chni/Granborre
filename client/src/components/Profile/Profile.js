import React from "react";
import logo from "../../images/logo.svg";
import "./Profile.css";
import { withRouter } from "react-router-dom";

function Profile(props) {

  const redirectToMenu = () => {
    props.updateTitle("Menu");
    props.history.push("/menu");
  };

  return (
    <div className="container-block">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="header-div">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 4C9.79004 4 8 5.78998 8 8C8 10.21 9.79004 12 12 12C14.21 12 16 10.21 16 8C16 5.78998 14.21 4 12 4ZM14.1 8C14.1 6.84003 13.16 5.90002 12 5.90002C10.84 5.90002 9.90002 6.84003 9.90002 8C9.90002 9.16003 10.84 10.1 12 10.1C13.16 10.1 14.1 9.16003 14.1 8ZM18.1 17C18.1 16.36 14.97 14.9 12 14.9C9.03003 14.9 5.90002 16.36 5.90002 17V18.1H18.1V17ZM4 17C4 14.34 9.32996 13 12 13C14.67 13 20 14.34 20 17V20H4V17Z"
            fill="#08BC1A"
            fillOpacity="1"
          />
        </svg>

        <h1 className="welcome-header">Welcome!</h1>
      </div>
      <div className="profile-div">
        <p>
          Thank you for signing up to use Granborre. Update your preferences
          below:
        </p>
        <div className="preferences-check">
          <input type="checkbox" value="emails" />
          Please email me updates and news
        </div>
        <div className="preferences-check">
          <input type="checkbox" value="texts" />
          Please text me updates and news
        </div>
        <button
          type="submit"
          className="grey-btn"
          onClick={() => redirectToMenu()}
        >
          Spara och tillbaka
        </button>
      </div>
    </div>
  );
}

export default withRouter(Profile);
