import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import "./Sidebar.css"; // Import the CSS file for sidebar styles

const   Sidebar = () => {
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
            <NavLink exact to="/" activeClassName="active">
                Admin Login
            </NavLink>
            </li>
            <li className="menu-item">
            <NavLink to="/Admin" activeClassName="active">
                View Reports
            </NavLink>
            </li>
            <li className="menu-item">
            <NavLink to="/CardsContainer" activeClassName="active">
                Cards Container
            </NavLink>
            </li>
            {isLoggedIn ? (
            <li className="menu-item">
                <button onClick={handleLogout}>Logout</button>
            </li>
            ) : null}
        </ul>
        </div>
    );
};

export default Sidebar;
