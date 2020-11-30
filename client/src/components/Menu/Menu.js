import React from 'react';
import logo from '../../images/logo.svg';

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
};

function Menu(props) {
    return(
<div>
    <div className="menu-container">
        <div className="menu">
            <div className="top">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        <ul className="middle">
            <a className="no-underline" href="/profile">
                <li>
                    <i className="fa fa-user"></i>Min Profil
                </li>
            </a>
                <li>
                    <button type="button" className="collapsible" style={{marginLeft: "20px"}}>
                    <i className="fa fa-tree"></i>
                    Mina Skogar
                    </button>
                    <div className="content">
                    <ul className="middle">
                        <li>Skog 1</li>
                        <li>Skog 2</li>
                    </ul>
                    </div>
                </li>
            <a className="no-underline" href="/analys">
                <li className="analysis">
                    <i style={{marginLeft: "-22px"}} className="fa fa-area-chart"></i>Analys
                </li>
            </a>
    </ul>
    <div className="bottom">
            <button className="logout-btn">Logga ut</button>
    </div>
  </div>
</div>
        </div>
    )
}

export default Menu;