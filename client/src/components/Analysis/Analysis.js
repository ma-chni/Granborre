import React from 'react';
import logoWhite from "../../images/logo.svg";
import forest from '../../images/forest.png'; // with import
import { withRouter } from "react-router-dom";
function Analysis(props) {
    const redirectToMenu = () => {
        props.history.push("/menu");
      };
    return(
    <div className="container">
        <div className="menu">
            <div className="top">
                <img src={logoWhite} className="App-logo" alt="logo" />
            </div>
            <h2>Analys av skog</h2>
            <img className="forest-image" src={forest} alt="forest" />
            <div className="long-lat">
                <p>Latitude: 189.132423</p>
                <p>Longitude: 50.122341</p>
            </div>
            <button className="grey-btn" onClick={() => redirectToMenu()}>
            Tillbaka
          </button>
            </div>
        </div>
    )
}
export default withRouter(Analysis);