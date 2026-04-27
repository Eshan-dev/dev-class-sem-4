import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav id="navContainer">
      <div id="navBar">
        <div id="leftComp">
          <img src="https://static.naukimg.com/s/0/0/i/naukri-identity/naukri_gnb_logo.svg" alt="Logo" />
          <div id="leftComp-sub">
            <Link to="/" className="leftComp-sub-ele">Jobs</Link>
            <Link to="/admin" className="leftComp-sub-ele">Admin</Link>
          </div>
        </div>
        <div id="rightComp">
          <div id="btnContainer">
            <button id="loginBtn">Login</button>
            <button id="registerBtn">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
