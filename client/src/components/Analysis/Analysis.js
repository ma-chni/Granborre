import React from 'react';
import logoWhite from "../../images/logo.svg";
import forest from '../../images/forest.png'; // with import
function Analysis() {
    return(
    <div className="container">
        <div className="menu">
            <div className="top">
                <img src={logoWhite} className="App-logo" alt="logo" />
            </div>
            <h2>Analys av skog</h2>
            <img className="forest-image" src={forest} alt="forest" />
            <ul className="middle">
            <li>
                <p>Namn: </p>
            </li>
            <li>
                <p>Latitude: 189.132423</p>
            </li>
            <li>
                <p>Longitude: 50.122341</p>
            </li>
        </ul>
            </div>
        </div>
    )
}
export default Analysis;