import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCube } from "@fortawesome/free-solid-svg-icons";
import "./GlobalNavigationBar.css";

function GlobalNavigationBar() {
  return (
    <nav className="global-navigation-bar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <FontAwesomeIcon icon={faCube} />
            <span className="nav-title">Main</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Home" exact activeClassName="active">
            <FontAwesomeIcon icon={faHome} />
            <span className="nav-title">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/About" exact activeClassName="active">
            <FontAwesomeIcon icon={faChartBar} />
            <span className="nav-title">About</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default GlobalNavigationBar;
