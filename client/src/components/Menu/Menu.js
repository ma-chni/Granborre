import React from "react";
import logo from "../../images/logo.svg";
import { withRouter } from "react-router-dom";

function Menu(props) {
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };

  const redirectToProfile = () => {
    props.updateTitle("Profile");
    props.history.push("/profile");
  };

  const redirectToAnalys = () => {
    props.updateTitle("Analys");
    props.history.push("/analys");
  };

  const redirectToNewForest = () => {
    props.updateTitle("New Forest");
    props.history.push("/newforest");
  };

  const redirectToForestMap = () => {
    props.updateTitle("Forest Map");
    props.history.push("/forestmap");
  };

  setTimeout(function () {
    const coll = document.getElementsByClassName("collapsible");
  
    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }, 500);
  

  return (
    <div className="container">
      <div className="menu">
        <div className="top">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <ul className="middle">
          <li className="no-underline" onClick={() => redirectToProfile()}>
            <i className="fa fa-user"></i>Min Profil
          </li>
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
                <li className="no-underline" onClick={() => redirectToNewForest()}>
                  <i className="fa fa-tree" style={{ color: "red" }}></i>Lägg
                  till min skog
                </li>
                <li
                  className="no-underline" onClick={() => redirectToForestMap()}
                >
                  <i className="fa fa-tree" style={{ color: "green" }}></i>
                  Min skog
                </li>
              </ul>
            </div>
          </li>
          <li className="no-underline" onClick={() => redirectToAnalys()}>
            <i style={{ marginLeft: "-22px" }} className="fa fa-area-chart"></i>
            Analys
          </li>
        </ul>
        <div className="bottom">
          <button className="grey-btn" onClick={() => redirectToLogin()}>
            Logga ut
          </button>
        </div>
      </div>
    </div>
  );
}


export default withRouter(Menu);
