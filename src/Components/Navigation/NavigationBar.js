import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCube } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <nav className={styles.globalNavigationBar}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} >
            <FontAwesomeIcon icon={faCube} />
            <span className={styles.navTitle}>Main</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Home" className={({ isActive }) => isActive ? styles.active : undefined} >
            <FontAwesomeIcon icon={faHome} />
            <span className={styles.navTitle}>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/About" className={({ isActive }) => isActive ? styles.active : undefined} >
            <FontAwesomeIcon icon={faChartBar} />
            <span className={styles.navTitle}>About</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default NavigationBar;
