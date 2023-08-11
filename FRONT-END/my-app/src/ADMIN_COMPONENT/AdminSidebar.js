import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./Sidebar.css"; // Import the CSS file for sidebar styles
import "./AdminStyles.css";
const   AdminSidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // Perform any logout actions here, e.g., clearing user data from localStorage
        setIsLoggedIn(false);
        alert("You have logged out.");
    };

    return (
        <div className="sidebar">
        <div className="logo">I REPORTER</div>
        <ul className="menu">
            <li className="menu-item">
            <NavLink exact to="/map" activeClassName="active">
                Admin Map
            </NavLink>
            </li>
            <li className="menu-item">
            <NavLink to="/allreports" activeClassName="active">
                View Reports
            </NavLink>
            </li>
            <li className="menu-item">
            <NavLink to="/" activeClassName="active">
               Log Out
            </NavLink>
            </li>
            {/* <li className="menu-item">
            {isLoggedIn ? (
            <li className="menu-item">
                <button onClick={handleLogout}>Logout</button>
            </li>
            ) : null}
            </li> */}
            
        </ul>
        </div>
    );
};

export default AdminSidebar;
