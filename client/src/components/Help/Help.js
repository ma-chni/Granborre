import React from "react";
import logoWhite from "../../images/logo.svg";
import { withRouter } from "react-router-dom";
import lumberjack from "../../images/lumberjack.jpg";
import "./Help.css";

function Help(props) {
  const redirectToMenu = () => {
    props.history.push("/menu");
  };
  return (
    <div className="container">
      <div className="menu">
        <div className="top">
          <img src={logoWhite} className="App-logo" alt="logo" />
        </div>
        <h2 className="help-header">Vad behöver du hjälp med?</h2>
        <img src={lumberjack} className="lumberjack" alt="lumberjack" />
        <ul className="help-list">
          <li className="help-list-item">Granbarkborreangrepp</li>
          <li className="help-list-item">Rådgivning</li>
          <li className="help-list-item">Skogsentreprenörer</li>
        </ul>
        <button className="grey-btn help-back" onClick={() => redirectToMenu()}>
          Tillbaka
        </button>
      </div>
    </div>
  );
}
export default withRouter(Help);
