import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';

function Card({ imgSrc, title, report, reporter, reportStatus }) {
    const [status, setStatus] = useState(reportStatus);

    const handleStatusChange = () => {
        // Toggle between 'rejected', 'investigated', and 'pending' statuses
        setStatus((prevStatus) => {
        switch (prevStatus) {
            case 'rejected':
            return 'investigated';
            case 'investigated':
            return 'pending';
            default:
            return 'rejected';
        }
        });
    };

    const getStatusIcon = () => {
        switch (status) {
        case 'rejected':
            return <FaTimesCircle className="status-icon rejected" />;
        case 'investigated':
            return <FaCheckCircle className="status-icon investigated" />;
        default:
            return <FaQuestionCircle className="status-icon pending" />;
        }
    };

    return (
        <div className="card">
        <img src={imgSrc} alt={title} />
        <h2>{title}</h2>
        <p>
            <span className="seats">{reporter}</span>
        </p>
        <p>{report}</p>
        <p>
            {getStatusIcon()} ReportStatus: {status}
        </p>
        <button className="book-btn" onClick={handleStatusChange}>
            View Report
        </button>
        </div>
    );
}

export default Card;
