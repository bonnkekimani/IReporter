import React, { useState } from 'react';
// import './Sidebar.css'; // Create a CSS file for sidebar styling

const Sidebar = () => {
    const [status, setStatus] = useState('Under Investigation');

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <div className="sidebar">
        <div className="logo">I-Reporter</div>
        <ul className="menu">
            <li className="menu-item">View Reports</li>
            <li className="menu-item">Logout</li>
            <li
            className="menu-item"
            style={{
                color:
                status === 'Under Investigation'
                    ? 'black'
                    : status === 'Rejected'
                    ? 'red'
                    : 'green',
            }}
            onClick={() => handleStatusChange('Under Investigation')}
            >
            Change Status
            </li>
        </ul>
        </div>
    );
};

export default Sidebar;
