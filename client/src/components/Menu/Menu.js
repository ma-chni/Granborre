import React from "react";
import logo from "../../images/logo.svg";

function Menu(props) {
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };

  const redirectToAnalysis = () => {
    props.updateTitle("Analys");
    props.history.push("/analys");
  };

  const redirectToProfile = () => {
    props.updateTitle("Profile");
    props.history.push("/profile");
  };

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  return (
    <div className="container">
      <div className="menu">
        <div className="top">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <ul className="middle">
          <a
            className="no-underline"
            onClick={(e) => {
              e.preventDefault();
              redirectToProfile();
            }}
          >
            <li>
              <i className="fa fa-user"></i>Min Profil
            </li>
          </a>
          <li>
            <button
              type="button"
              className="collapsible"
              style={{ marginLeft: "20px" }}
            >
              <i className="fa fa-tree"></i>
              Mina Skogar
            </button>
            <div className="content">
              <ul className="middle">
                <a className="no-underline" href="/skog-1">
                  <li>
                    <i className="fa fa-tree" style={{ color: "red" }}></i>Skog
                    1
                  </li>
                </a>
                <a className="no-underline" href="/skog-2">
                  <li>
                    <i className="fa fa-tree" style={{ color: "green" }}></i>
                    Skog 2
                  </li>
                </a>
              </ul>
            </div>
          </li>
          <a
            className="no-underline"
            onClick={(e) => {
              e.preventDefault();
              redirectToAnalysis();
            }}
          >
            <li className="analysis">
              <i
                style={{ marginLeft: "-22px" }}
                className="fa fa-area-chart"
              ></i>
              Analys
            </li>
          </a>
        </ul>
        <div className="bottom">
          <button
            className="grey-btn"
            onClick={(e) => {
              e.preventDefault();
              redirectToLogin();
            }}
          >
            Logga ut
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
