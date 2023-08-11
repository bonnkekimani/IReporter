import React, { useState } from "react";
import "./style.css";
import {Link} from "react-router-dom"
function UserSideBar () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        // Perform any logout actions here, e.g., clearing user data from localStorage
        setIsLoggedIn(false);
        alert("You have logged out.");
    };
  return (
    <div className="sidebar-user">
        <ul>
        <li className="menu-item">
                <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li className="menu-item">
                <Link to='/map'>Map</Link>
            </li>
            <li className="menu-item">
                <Link to='/reportform'>File Report</Link>
            </li>
            <li className="menu-item">
                <Link to='/reportlist'>All Reports</Link>
            </li>
           
            <li className="menu-item">
                <Link to='/'>Log Out</Link>
            </li>
            
        </ul>
       
    
        </div>
  )
}

export default UserSideBar
